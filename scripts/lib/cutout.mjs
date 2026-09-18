/**
 * Knock the white studio sweep out of a vial shot.
 *
 * A blanket "white becomes transparent" would hollow out the label and the
 * lyophilised powder, both of which are white, so the fill starts at the image
 * border and only clears background actually connected to it. The vial's own
 * outline is dark enough everywhere to stop it.
 *
 * The one place a single threshold fails is the contact shadow: it is a soft
 * grey that never reaches the cutoff, so a strict pass leaves a smudge under
 * the vial. Below the vial's base the threshold therefore drops hard, which is
 * safe precisely because nothing of the vial is down there — `baseY` is found
 * per image as the last row still containing the vial's dark outline.
 *
 * Thresholding alone cannot separate the label from the sweep — both are
 * 253-255 — so what actually holds the fill out is the vial's edge, and on two
 * of the thirty shots (VIP, Thymosin Alpha-1) the label runs so close to the
 * glass that the edge thins to a pixel or two and the fill poured through,
 * emptying the white half of the label. Eroding the background mask before the
 * fill closes gaps that narrow; dilating the cleared region afterwards, and
 * only over pixels that were background to begin with, puts the real edge back
 * without reopening them.
 *
 * `rowConvex` is for the nasal spray bottles. Their pump caps are white
 * plastic on the same white sweep, and in places the cap's edge is too faint
 * for even the sealed mask to hold, so the fill leaks in and leaves holes.
 * Only for a subject that is solid across every row (a bottle seen side-on is
 * a solid of revolution), it keeps everything between each row's outermost
 * kept pixels, which closes any hole whatever made it, and mirrors each row
 * about the bottle's axis so a bite out of one edge is restored too. Not for the vials: a
 * vial is the same shape, but their cut-outs are already clean and nothing
 * needs changing there.
 *
 * @param {{ rowConvex?: boolean }} [options]
 * @returns {number} Fraction of the frame cleared.
 */
export function knockOutBackground(data, width, height, { rowConvex = false } = {}) {
  let baseY = height - 1
  for (let y = height - 1; y >= 0; y--) {
    let dark = 0
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      if (data[i] < 120 && data[i + 1] < 120 && data[i + 2] < 120) dark++
    }
    // A handful of pixels, not one: JPEG-ish noise in the sweep can produce a
    // lone dark pixel well below the vial.
    if (dark > 3) {
      baseY = y
      break
    }
  }

  // Start the aggressive band slightly above the base so the shadow that
  // spreads out to either side of the vial goes with it.
  const floorY = baseY - Math.round(height * 0.04)
  const thresholdAt = y => (y > floorY ? 150 : 246)

  // Everything pale enough to be sweep, label or powder — connectivity, not
  // this mask, is what tells them apart.
  const pale = new Uint8Array(width * height)
  for (let y = 0; y < height; y++) {
    const t = thresholdAt(y)
    for (let x = 0; x < width; x++) {
      const p = y * width + x
      const i = p * 4
      if (data[i] >= t && data[i + 1] >= t && data[i + 2] >= t) pale[p] = 1
    }
  }

  // Two rounds of erosion: enough to seal the pixel-wide gaps, small enough
  // that the dilation below restores the silhouette faithfully.
  const SEAL = 2

  let mask = pale
  for (let round = 0; round < SEAL; round++) {
    const next = new Uint8Array(width * height)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const p = y * width + x
        if (mask[p] && mask[p - 1] && mask[p + 1] && mask[p - width] && mask[p + width]) next[p] = 1
      }
    }
    // The frame itself erodes away otherwise, and the fill needs somewhere to
    // start, so the border keeps whatever the unshrunk mask said.
    for (let x = 0; x < width; x++) {
      next[x] = pale[x]
      next[(height - 1) * width + x] = pale[(height - 1) * width + x]
    }
    for (let y = 0; y < height; y++) {
      next[y * width] = pale[y * width]
      next[y * width + width - 1] = pale[y * width + width - 1]
    }
    mask = next
  }

  const outside = new Uint8Array(width * height)
  const stack = []
  const seed = (x, y) => {
    const p = y * width + x
    if (!outside[p] && mask[p]) {
      outside[p] = 1
      stack.push(p)
    }
  }

  for (let x = 0; x < width; x++) {
    seed(x, 0)
    seed(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    seed(0, y)
    seed(width - 1, y)
  }

  while (stack.length) {
    const p = stack.pop()
    const x = p % width
    const y = (p - x) / width
    if (x > 0) seed(x - 1, y)
    if (x < width - 1) seed(x + 1, y)
    if (y > 0) seed(x, y - 1)
    if (y < height - 1) seed(x, y + 1)
  }

  // Grow the cleared region back by what erosion took, staying inside `pale`
  // so it can only reclaim pixels that were background in the first place.
  for (let round = 0; round < SEAL; round++) {
    const grown = Uint8Array.from(outside)
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const p = y * width + x
        if (outside[p] || !pale[p]) continue
        if (outside[p - 1] || outside[p + 1] || outside[p - width] || outside[p + width]) grown[p] = 1
      }
    }
    outside.set(grown)
  }

  if (rowConvex) {
    const lefts = new Int32Array(height)
    const rights = new Int32Array(height)
    for (let y = 0; y < height; y++) {
      const row = y * width
      let left = 0
      while (left < width && outside[row + left]) left++
      let right = width - 1
      while (right >= left && outside[row + right]) right--
      lefts[y] = left
      rights[y] = right
    }
    // A leak can also bite into the outline itself, leaving a notch a row or
    // two tall at the edge. A five-row median removes that and moves a real
    // step in the silhouette (where the cap flares out) by at most two rows.
    const median = (values, y) => {
      const window = []
      for (let k = Math.max(0, y - 2); k <= Math.min(height - 1, y + 2); k++) window.push(values[k])
      window.sort((a, b) => a - b)
      return window[window.length >> 1]
    }
    // The bottle is shot square-on, so it is mirror-symmetric about a vertical
    // axis. A leak that bites into one side (on the VIP cap it takes the left
    // 40% of three rows) is repaired by giving each row the wider of its two
    // halves. The axis is the median of every row's midpoint, so the few
    // damaged rows cannot pull it over.
    const mids = []
    for (let y = 0; y < height; y++) if (lefts[y] <= rights[y]) mids.push(lefts[y] + rights[y])
    mids.sort((a, b) => a - b)
    const axis2 = mids[mids.length >> 1] ?? width // twice the axis x, to stay in integers

    // A leak can also run the whole width of a seam, leaving a row that looks
    // empty; the median takes that row's edges from the rows around it. A
    // genuinely empty row (above the nozzle, below the base) has empty
    // neighbours too, so its medians cross over and nothing is filled.
    for (let y = 0; y < height; y++) {
      let left = Math.min(lefts[y], median(lefts, y))
      let right = Math.max(rights[y], median(rights, y))
      if (left > right) continue
      const half2 = Math.max(axis2 - 2 * left, 2 * right - axis2)
      left = Math.max(0, Math.floor((axis2 - half2) / 2))
      right = Math.min(width - 1, Math.ceil((axis2 + half2) / 2))
      for (let x = left; x <= right; x++) outside[y * width + x] = 0
    }
  }

  let cleared = 0
  for (let p = 0; p < outside.length; p++) {
    if (!outside[p]) continue
    data[p * 4 + 3] = 0
    cleared++
  }

  // Feather the cut so the glass keeps its anti-aliased rim instead of ending
  // in a hard stair-step: an opaque pixel touching a cleared one gets alpha
  // from how far it is from white.
  const alphaAt = p => data[p * 4 + 3]
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const p = y * width + x
      if (alphaAt(p) === 0) continue
      const touchesCleared =
        alphaAt(p - 1) === 0 ||
        alphaAt(p + 1) === 0 ||
        alphaAt(p - width) === 0 ||
        alphaAt(p + width) === 0
      if (!touchesCleared) continue
      const i = p * 4
      const brightness = Math.min(data[i], data[i + 1], data[i + 2])
      data[i + 3] = Math.round(Math.min(255, Math.max(0, (255 - brightness) * 3)))
    }
  }

  return cleared / (width * height)
}
