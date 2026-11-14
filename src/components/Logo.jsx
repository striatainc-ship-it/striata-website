// The reversed horizontal lockup from the brand logo kit (03_Horizontal):
// snow wordmark with the teal "TA" and helix, for navy grounds. Vector, so
// it stays sharp at any size; do not recolour it or add effects.
export default function Logo({ className = '' }) {
  return (
    <div className={`inline-flex ${className}`}>
      <img
        src={`${import.meta.env.BASE_URL}assets/logo-reversed.svg`}
        alt="STRIATA"
        width={1533}
        height={479}
        className="h-11 w-auto"
      />
    </div>
  )
}
