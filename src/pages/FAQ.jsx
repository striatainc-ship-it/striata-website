import { useState } from 'react'
import { whatsappLink } from '../data/products'

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const faqSections = [
  {
    title: 'About Peptides',
    questions: [
      {
        q: 'What are peptides?',
        a: 'Peptides are short chains of amino acids, the building blocks of proteins naturally found in the human body. They act as biological messengers, signalling cells to perform specific functions such as tissue repair, hormone release, fat metabolism, cognitive enhancement and much more. Think of them as precise instructions your body already understands.',
      },
      {
        q: 'Are peptides safe?',
        a: 'All products in the STRIATA catalogue are research-grade compounds intended for research purposes only. Peptides are generally well-tolerated in research settings, but individual responses can vary. As with any compound, there is potential for side effects depending on the peptide, dosage and the individual. We always recommend consulting a qualified medical professional before beginning any peptide protocol.',
      },
      {
        q: 'What are the potential side effects of peptides?',
        a: 'Side effects vary significantly depending on the specific peptide and individual. Commonly reported effects in research settings include mild injection site reactions, temporary water retention, changes in appetite, headaches or fatigue (most of which are transient). More potent compounds such as GH secretagogues or GLP-1 agonists may have more pronounced effects. We strongly recommend consulting a medical professional and thoroughly researching any compound before use.',
      },
      {
        q: 'Are your peptides tested for purity?',
        a: 'Yes. Every product in the STRIATA catalogue meets a minimum 99% purity standard and is independently verified through third-party laboratory testing. If you would like to see a Certificate of Analysis for any product, simply ask us on WhatsApp and we will send it to you promptly.',
      },
      {
        q: 'Are these products for human use?',
        a: 'All STRIATA products are sold strictly for research purposes only and are not intended for human or veterinary use. They are not approved by SAHPRA or any other regulatory authority for human consumption. By purchasing from STRIATA you agree to use all products in accordance with applicable research regulations.',
      },
      {
        q: 'Can you help me choose the right peptide for my goals?',
        a: "We can offer general guidance on the compounds we stock and point you toward relevant research. However, we are not medical professionals and cannot provide personalised medical advice or prescribe protocols. We strongly recommend consulting a qualified healthcare provider for anything protocol-specific. That said, feel free to chat to us on WhatsApp and we are happy to assist where we can.",
      },
    ],
  },
  {
    title: 'Ordering & Payment',
    questions: [
      {
        q: 'How do I place an order?',
        a: 'Simply chat to us on WhatsApp with the products you are interested in. Our team will confirm availability, provide pricing and guide you through the process. It really is that simple.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Electronic Funds Transfer (EFT) and cryptocurrency. Payment details will be provided once your order is confirmed via WhatsApp.',
      },
      {
        q: 'Do I need to pay upfront?',
        a: 'For standard in-stock orders, full payment is required upfront before dispatch. For large specialised orders that require sourcing, we require a 50% deposit upfront with the remainder due upon delivery.',
      },
      {
        q: 'What qualifies as a large or specialised order?',
        a: 'Orders of 10 or more vials of specialised compounds that we do not keep in regular stock are classified as large orders. These typically have a lead time of 10 to 15 business days. Our team will confirm this with you when you enquire.',
      },
      {
        q: 'Can I get a price list?',
        a: 'Yes, simply message us on WhatsApp and we will send you our full current price list. Pricing is not displayed on the website as it is subject to change based on stock and order size.',
      },
      {
        q: 'Do you offer bulk pricing for businesses?',
        a: 'Absolutely. We supply dozens of businesses across South Africa including clinics, wellness centres and health retailers. Chat to us on WhatsApp to discuss bulk pricing and ongoing supply arrangements tailored to your business needs.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    questions: [
      {
        q: 'Do you ship nationwide?',
        a: 'Yes, we deliver to all provinces across South Africa. Delivery fees are confirmed upon order placement based on your location and order size.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery via Courier Guy typically takes 2 to 3 business days. We also offer overnight shipping for faster delivery. Same-day delivery is available for orders placed before 11am, depending on your location. Chat to us on WhatsApp to confirm availability in your area.',
      },
      {
        q: 'Is packaging discreet?',
        a: 'Yes. All orders are packaged discreetly with no branding or product descriptions visible on the outside of the packaging. Your privacy is important to us.',
      },
      {
        q: 'How are peptides packaged to ensure quality during transit?',
        a: 'All peptides are carefully packaged to maintain integrity during transit. Lyophilised (freeze-dried) peptides are stable at room temperature for short periods, but we recommend refrigerating them upon receipt for optimal shelf life. All stored peptides maintain a shelf life of up to 2 years when stored correctly.',
      },
      {
        q: 'Do I get a tracking number?',
        a: 'Yes. Once your order has been dispatched you will receive a tracking number via WhatsApp so you can monitor your delivery in real time.',
      },
    ],
  },
  {
    title: 'Storage & Handling',
    questions: [
      {
        q: 'How should I store my peptides?',
        a: 'Lyophilised (freeze-dried) peptides should be stored in a cool, dry place away from direct sunlight. Once reconstituted, peptides should be refrigerated at 2°C to 8°C and used within the recommended timeframe. Do not freeze reconstituted peptides.',
      },
      {
        q: 'How do I reconstitute a peptide?',
        a: 'Lyophilised peptides are reconstituted by adding bacteriostatic water or acetic acid solution to the vial. The specific reconstitution solution depends on the peptide. We stock both bacteriostatic water and acetic acid 0.6%. Chat to us on WhatsApp and we will advise on the correct solution for your specific compound.',
      },
      {
        q: 'What is the shelf life of your peptides?',
        a: 'All STRIATA peptides maintain a shelf life of up to 2 years when stored correctly in their lyophilised form. Once reconstituted, shelf life reduces significantly and varies by compound.',
      },
      {
        q: 'Do you sell bacteriostatic water and reconstitution supplies?',
        a: 'Yes. We stock bacteriostatic water (3ml and 10ml vials) and acetic acid 0.6% solution for reconstitution. We also include a free 10-vial kit of 3ml bacteriostatic water with every bulk order of 10 or more vials. Ask us about adding supplies to your order.',
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    questions: [
      {
        q: 'Do you accept returns?',
        a: 'Due to the nature of our products (research-grade biological compounds with strict storage and handling requirements), we are unable to accept returns or offer refunds once an order has been dispatched. We encourage you to review your order carefully before confirming.',
      },
      {
        q: 'What if my order arrives damaged or incorrect?',
        a: 'If your order arrives damaged or you receive an incorrect product, please contact us immediately on WhatsApp with photos of the packaging and product. We will investigate and resolve the issue as quickly as possible.',
      },
      {
        q: 'What if my order is lost in transit?',
        a: 'In the rare event that your order is lost in transit, please contact us and we will follow up with the courier on your behalf. We will work to resolve the situation as fairly and quickly as possible.',
      },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-white font-semibold text-sm md:text-base leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-[#00B4B4] shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-white/60 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [search, setSearch] = useState('')

  const filteredSections = faqSections
    .map((section) => ({
      ...section,
      questions: section.questions.filter(
        ({ q, a }) =>
          !search ||
          q.toLowerCase().includes(search.toLowerCase()) ||
          a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((s) => s.questions.length > 0)

  return (
    <div className="bg-[#0A1628] min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00B4B4]/5 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-5" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Frequently Asked <span className="text-[#00B4B4]">Questions</span>
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Everything you need to know about our products, ordering, shipping and more. Can't find your answer? Chat to us directly on WhatsApp.
          </p>
          <div className="relative max-w-md mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1e35] border border-white/10 rounded-full pl-11 pr-5 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00B4B4]/50 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        {filteredSections.length > 0 ? (
          filteredSections.map(({ title, questions }) => (
            <div key={title} className="mb-10">
              <h2
                className="text-[#00B4B4] text-xs font-bold uppercase tracking-widest mb-4"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {title}
              </h2>
              <div className="bg-[#0d1e35] border border-white/8 rounded-2xl px-6">
                {questions.map((item) => (
                  <FAQItem key={item.q} {...item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-white/30">No questions match your search.</p>
            <button onClick={() => setSearch('')} className="mt-3 text-[#00B4B4] text-sm hover:text-white transition-colors">
              Clear search
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/8 text-center px-6">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Still Have <span className="text-[#00B4B4]">Questions?</span>
        </h2>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Our team is available on WhatsApp and typically responds within 1 hour during business hours. No question is too small.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#00B4B4] hover:bg-[#009999] text-white font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-teal-500/30"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {WA_ICON}
          Chat to Us on WhatsApp
        </a>
        <p className="mt-4 text-white/30 text-sm flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Typically responds within 1 hour during business hours
        </p>
      </section>
    </div>
  )
}
