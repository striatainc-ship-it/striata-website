export default function Logo({ className = '' }) {
  return (
    <div className={`inline-flex ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}assets/logo-glow.png`}
        alt="STRIATA"
        className="h-14 w-auto"
      />
    </div>
  )
}
