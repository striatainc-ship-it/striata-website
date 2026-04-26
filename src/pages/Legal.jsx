import { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const navLinks = [
  { label: 'Terms & Conditions', anchor: 'terms' },
  { label: 'Privacy Policy', anchor: 'privacy' },
  { label: 'Research Disclaimer', anchor: 'disclaimer' },
  { label: 'Shipping Policy', anchor: 'shipping' },
  { label: 'Refund Policy', anchor: 'refunds' },
  { label: 'Governing Law', anchor: 'governing' },
]

function Section({ id, title, children }) {
  return (
    <div id={id} className="mb-14 scroll-mt-28">
      <h2
        className="text-xl md:text-2xl font-black text-white mb-6 pb-3 border-b border-white/8"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function Sub({ title, children }) {
  return (
    <div>
      <h3 className="text-white/80 font-semibold text-sm mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {title}
      </h3>
      <p className="text-white/55 text-sm leading-relaxed">{children}</p>
    </div>
  )
}

export default function Legal() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash])

  return (
    <div className="bg-[#0A1628] min-h-screen">
      <Helmet>
        <title>Legal & Privacy Policy | STRIATA</title>
        <meta name="description" content="STRIATA's terms and conditions, privacy policy, shipping policy and legal disclaimer for research peptide supply in South Africa." />
        <link rel="canonical" href="https://striatalabs.co.za/legal" />
        <meta property="og:title" content="Legal & Privacy Policy | STRIATA" />
        <meta property="og:description" content="Terms, privacy policy, shipping and legal disclaimer for STRIATA research peptides." />
        <meta property="og:url" content="https://striatalabs.co.za/legal" />
      </Helmet>
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-8"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}assets/background overlay 2.png)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Legal & <span className="text-[#00B4B4]">Policies</span>
          </h1>
          <p className="text-white/55 text-base max-w-2xl mx-auto mb-2">
            Please read the following carefully. By using the STRIATA website and purchasing our products you agree to the terms outlined below.
          </p>
          <p className="text-white/30 text-sm">Last updated: April 2026</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        {/* Quick Nav */}
        <div className="mb-12 bg-[#0d1e35] border border-white/8 rounded-2xl p-5">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Quick Navigation
          </p>
          <div className="flex flex-wrap gap-2">
            {navLinks.map(({ label, anchor }) => (
              <a
                key={anchor}
                href={`#${anchor}`}
                className="text-white/60 hover:text-[#00B4B4] text-xs border border-white/8 hover:border-[#00B4B4]/30 rounded-lg px-3 py-2 transition-all duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Content */}
        <Section id="terms" title="Terms & Conditions">
          <Sub title="1.1 Introduction">
            These Terms and Conditions govern your use of the STRIATA website and the purchase of any products offered by STRIATA, operating from Johannesburg, South Africa. By accessing our website or placing an order with us, you agree to be bound by these terms in full. If you do not agree, please do not use our website or services.
          </Sub>
          <Sub title="1.2 Eligibility">
            You must be 18 years of age or older to browse this website or purchase any products from STRIATA. By placing an order you confirm that you meet this age requirement. STRIATA reserves the right to cancel any order where this requirement cannot be confirmed.
          </Sub>
          <Sub title="1.3 Products and Research Use">
            All products sold by STRIATA are intended strictly for research purposes only. They are not approved for human or veterinary use and are not intended to diagnose, treat, cure or prevent any medical condition. By purchasing from STRIATA you confirm that you understand and accept this and that products will be used solely in accordance with applicable research regulations.
          </Sub>
          <Sub title="1.4 WhatsApp Orders">
            STRIATA processes orders primarily via WhatsApp. By initiating an order through WhatsApp you are entering into a binding purchase agreement with STRIATA subject to these Terms and Conditions. Order confirmations sent via WhatsApp constitute a valid and binding record of your purchase. STRIATA reserves the right to cancel or refuse any order at its sole discretion.
          </Sub>
          <Sub title="1.5 Pricing and Payment">
            All prices are quoted in South African Rand (ZAR) and are subject to change without notice. STRIATA accepts payment via Electronic Funds Transfer (EFT) and cryptocurrency. Full payment is required upfront for standard orders. A 50% deposit is required for large or specialised orders of 10 or more vials, with the balance due upon delivery. Orders will not be dispatched until payment has been received and confirmed.
          </Sub>
          <Sub title="1.6 Intellectual Property">
            All content on the STRIATA website including text, images, logos, product descriptions and graphics is the intellectual property of STRIATA and may not be reproduced, distributed or used without prior written permission.
          </Sub>
          <Sub title="1.7 Limitation of Liability">
            To the fullest extent permitted by South African law, STRIATA shall not be liable for any direct, indirect, incidental or consequential damages arising from the use of our products or website. Our total liability to you shall not exceed the amount paid for the specific order in question.
          </Sub>
          <Sub title="1.8 Changes to Terms">
            STRIATA reserves the right to update these Terms and Conditions at any time. Continued use of the website following any changes constitutes acceptance of the updated terms. The date of the most recent revision is displayed at the top of this page.
          </Sub>
        </Section>

        <Section id="privacy" title="Privacy Policy">
          <Sub title="2.1 Introduction">
            STRIATA is committed to protecting your privacy. This policy explains what personal information we collect, how we use it and how we keep it safe. By using our website or services you consent to the practices described in this policy.
          </Sub>
          <Sub title="2.2 Information We Collect">
            We may collect the following personal information from you: your name, email address (via newsletter signup), WhatsApp number and order details shared during the ordering process. We also collect non-personal information through cookies and website analytics to help us understand how visitors use our site.
          </Sub>
          <Sub title="2.3 How We Use Your Information">
            We use your personal information to process and fulfil your orders, respond to enquiries via WhatsApp, send you our newsletter if you have subscribed, and improve our website and services. We will never sell, rent or share your personal information with third parties for marketing purposes.
          </Sub>
          <Sub title="2.4 Cookies">
            Our website uses cookies to improve your browsing experience. Cookies are small text files stored on your device that help us understand how you interact with our site. You can choose to disable cookies through your browser settings, though this may affect certain website functionality. By continuing to use our website you consent to our use of cookies.
          </Sub>
          <Sub title="2.5 Newsletter">
            If you subscribe to our newsletter you consent to receiving monthly email communications from STRIATA. You may unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly on WhatsApp. We will remove you from our mailing list promptly.
          </Sub>
          <Sub title="2.6 Data Security">
            We take reasonable precautions to protect your personal information from unauthorised access, loss or misuse. However no method of electronic transmission or storage is completely secure and we cannot guarantee absolute security.
          </Sub>
          <Sub title="2.7 Your Rights">
            Under the Protection of Personal Information Act (POPIA) you have the right to access, correct or request deletion of your personal information held by STRIATA. To exercise any of these rights please contact us directly on WhatsApp.
          </Sub>
          <Sub title="2.8 Changes to This Policy">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated revision date.
          </Sub>
        </Section>

        <Section id="disclaimer" title="Research Disclaimer">
          <p className="text-white/55 text-sm leading-relaxed">
            All products sold by STRIATA are intended for research purposes only. They are not approved by the South African Health Products Regulatory Authority (SAHPRA) or any other regulatory body for human or veterinary use. These products are not medicines and are not intended to diagnose, treat, cure or prevent any disease or medical condition.
          </p>
          <p className="text-white/55 text-sm leading-relaxed">
            STRIATA makes no health claims regarding any of its products. Any information provided on this website, including product descriptions and blog content, is for educational and informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before beginning any health or supplementation protocol.
          </p>
          <p className="text-white/55 text-sm leading-relaxed">
            By purchasing any product from STRIATA you confirm that you are at least 18 years of age, that you understand the research-only nature of these products and that you accept full responsibility for their intended use in compliance with all applicable laws and regulations.
          </p>
        </Section>

        <Section id="shipping" title="Shipping Policy">
          <Sub title="4.1 Delivery Coverage">
            STRIATA delivers nationwide across all provinces in South Africa via Courier Guy. Delivery fees are calculated based on your location and order size and will be confirmed with you via WhatsApp before dispatch.
          </Sub>
          <Sub title="4.2 Delivery Timeframes">
            Standard delivery typically takes 2 to 3 business days from the date of dispatch. Overnight delivery is available on request. Same-day delivery is available for orders placed and confirmed before 11am, subject to location availability. Please confirm same-day eligibility with our team via WhatsApp before placing your order.
          </Sub>
          <Sub title="4.3 Order Processing">
            Orders are processed and dispatched once full payment has been received and confirmed. Large or specialised orders requiring sourcing have a lead time of 10 to 15 business days from receipt of the 50% deposit.
          </Sub>
          <Sub title="4.4 Tracking">
            Once your order has been dispatched you will receive a tracking number via WhatsApp to monitor your delivery in real time.
          </Sub>
          <Sub title="4.5 Packaging">
            All orders are packaged discreetly. No branding or product descriptions are visible on the outside of the packaging. Products are carefully packaged to maintain integrity during transit.
          </Sub>
          <Sub title="4.6 Delivery Delays">
            While we do our best to meet the timeframes above, delivery delays can occasionally occur due to factors outside our control including courier delays, public holidays or adverse weather conditions. STRIATA will communicate any known delays to you promptly via WhatsApp.
          </Sub>
        </Section>

        <Section id="refunds" title="Refund Policy">
          <Sub title="5.1 General Policy">
            Due to the specialised nature of our products (research-grade biological compounds with strict storage and handling requirements), STRIATA is unable to accept returns or issue refunds once an order has been dispatched. We kindly ask that you review your order carefully before confirming.
          </Sub>
          <Sub title="5.2 Damaged or Incorrect Orders">
            We take great care in packaging every order, but if your order arrives damaged or you receive an incorrect product please contact us immediately via WhatsApp with photos of the packaging and the product. We will investigate promptly and work with you to find a fair resolution as quickly as possible.
          </Sub>
          <Sub title="5.3 Lost Orders">
            In the rare event that your order is lost in transit, please notify us via WhatsApp and we will follow up with the courier on your behalf. We will do everything we can to resolve the situation fairly and efficiently.
          </Sub>
          <Sub title="5.4 Deposit Orders">
            For large or specialised orders requiring a 50% deposit, the deposit is non-refundable once sourcing has commenced. If you wish to cancel before sourcing has begun please contact us immediately via WhatsApp.
          </Sub>
        </Section>

        <Section id="governing" title="Governing Law">
          <p className="text-white/55 text-sm leading-relaxed">
            These terms, policies and any disputes arising from your use of the STRIATA website or purchase of our products shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes shall be subject to the exclusive jurisdiction of the courts of Johannesburg, South Africa.
          </p>
        </Section>

        {/* Back to FAQ */}
        <div className="pt-4 border-t border-white/8">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#00B4B4] text-sm transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to FAQs
          </Link>
        </div>
      </div>
    </div>
  )
}
