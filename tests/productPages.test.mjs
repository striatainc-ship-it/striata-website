import { test } from 'node:test'
import assert from 'node:assert/strict'
import { products, pagedProducts, productPath, isInStock, slugFromName } from '../src/data/products.js'

test('slugFromName makes clean URL slugs', () => {
  assert.equal(slugFromName('Tesa10 + Ipamorelin Stack'), 'tesa10-ipamorelin-stack')
  assert.equal(slugFromName('NAD+'), 'nad')
  assert.equal(slugFromName('  BPC-157 / TB-500  '), 'bpc-157-tb-500')
})

test('every in-stock product has a page or a landing page of its own', () => {
  for (const product of products.filter(isInStock)) {
    assert.ok(productPath(product), `${product.name} is in stock but has no page`)
  }
})

test('product page slugs are unique', () => {
  const slugs = pagedProducts.map((p) => p.slug)
  assert.equal(new Set(slugs).size, slugs.length)
})

test('hand-set slugs are never overwritten', () => {
  const retatrutide = products.find((p) => p.name === 'Retatrutide')
  assert.equal(retatrutide.slug, 'retatrutide')
  assert.equal(retatrutide.autoPage, undefined)
})
