export default function Logo({ className = '' }) {
  const base = import.meta.env.BASE_URL

  return (
    <div className={`inline-flex ${className}`}>
      <img
        src={`${base}assets/opt/logo-white-640.webp`}
        srcSet={`${base}assets/opt/logo-white-320.webp 320w, ${base}assets/opt/logo-white-640.webp 640w`}
        sizes="161px"
        alt="STRIATA"
        width={2418}
        height={840}
        className="h-14 w-auto"
      />
    </div>
  )
}
