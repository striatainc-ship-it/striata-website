export default function Logo({ className = '' }) {
  return (
    <div className={`inline-flex ${className}`}>
      <img
        src="/assets/logo-glow.png"
        alt="STRIATA"
        className="h-14 w-auto"
      />
    </div>
  )
}
