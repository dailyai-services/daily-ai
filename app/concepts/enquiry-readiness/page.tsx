"use client";

import { ArrowUpRight, Check, Clock3, MapPin, Phone, Sparkles } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Kitchen refresh",
    description:
      "A more considered layout, better storage and finishes chosen to suit everyday use.",
    tags: ["Layout", "Storage", "Finishes"],
  },
  {
    number: "02",
    title: "Living spaces",
    description:
      "Bring light, flow and a clear point of view to the rooms you spend the most time in.",
    tags: ["Planning", "Lighting", "Details"],
  },
  {
    number: "03",
    title: "Whole-home updates",
    description:
      "A coordinated plan for connected rooms, with decisions made in the right order.",
    tags: ["Planning", "Materials", "Coordination"],
  },
];

const steps = [
  ["01", "Tell us about the space", "Share the room, the challenge and what you want to change."],
  ["02", "Set the priorities", "We clarify the must-haves, style direction and practical constraints."],
  ["03", "Agree the scope", "You review the proposed work, inclusions and next steps before anything begins."],
];

export const metadata = {
  title: "Enquiry Readiness Concept Demo",
  description:
    "A fictional, responsive home-interiors website concept demonstrating clear service messaging and contact paths. Not client work.",
};

export default function EnquiryReadinessConcept() {
  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#20231f]">
      <div className="border-b border-[#d8d3c9] bg-[#20231f] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f4f1eb] sm:text-xs">
        Concept demo · Fictional business · Not client work
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-5 sm:px-8 lg:px-12">
        <a href="#main" className="group inline-flex items-center gap-3" aria-label="Cedar and Stone home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#344238] text-[#f4f1eb]">
            <span className="font-serif text-2xl leading-none">c</span>
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.16em]">CEDAR & STONE</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.22em] text-[#73776d]">Interiors · Concept</span>
          </span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm text-[#555b51] md:flex">
          <a className="transition hover:text-[#20231f]" href="#services">Services</a>
          <a className="transition hover:text-[#20231f]" href="#approach">Our approach</a>
          <a className="transition hover:text-[#20231f]" href="#contact">Contact</a>
        </nav>

        <a
          href="#contact"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#344238] px-5 text-xs font-semibold text-white transition hover:bg-[#202b23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#344238]"
        >
          Start a conversation <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-16 lg:grid-cols-[0.94fr_1.06fr] lg:gap-16 lg:px-12">
          <div className="max-w-2xl">
            <p className="mb-6 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#687365] sm:text-xs">
              <span className="h-px w-8 bg-[#9b8665]" />
              Thoughtful spaces, made practical
            </p>
            <h1 className="max-w-xl text-5xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              A home that feels more <span className="font-serif italic text-[#7d684c]">like you.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-[#64695f] sm:text-lg">
              Considered interior updates and renovations, shaped around how you live, what you need and the details that matter.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#344238] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#202b23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#344238]"
              >
                Discuss your space <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href="#services"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#c9c4b9] px-7 text-sm font-semibold text-[#344238] transition hover:border-[#344238] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#344238]"
              >
                Explore services
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-[#d8d3c9] pt-6 text-xs text-[#74786f]">
              <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#7d684c]" /> Clear project scope</span>
              <span className="inline-flex items-center gap-2"><Check size={14} className="text-[#7d684c]" /> Practical design choices</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[620px]">
            <div className="absolute -right-3 -top-5 h-28 w-28 rounded-full bg-[#d7c6a8] blur-3xl sm:-right-8 sm:-top-8" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#d9d1c2] p-3 shadow-[0_28px_70px_rgba(49,54,44,0.14)] sm:p-5">
              <div className="relative min-h-[390px] overflow-hidden rounded-[1.5rem] bg-[#b7a88f] sm:min-h-[500px]">
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #c8bba5 0%, #a99a81 48%, #6c7568 100%)" }} />
                <div className="absolute inset-x-[9%] bottom-[9%] top-[8%] rounded-t-[48%] border border-white/35" aria-hidden="true" />
                <div className="absolute left-[12%] top-[14%] h-[48%] w-[35%] rounded-t-full bg-[#e7e0d2] shadow-[inset_-18px_0_24px_rgba(94,86,69,0.12)]" />
                <div className="absolute left-[18%] top-[20%] h-[34%] w-[23%] rounded-t-full border-[8px] border-[#7d8b7d] bg-[#b8c3b2]" />
                <div className="absolute right-[11%] top-[19%] h-[38%] w-[30%] rounded-[45%_45%_4px_4px] bg-[#e4d8c4] shadow-[0_16px_30px_rgba(43,46,37,0.13)]" />
                <div className="absolute right-[15%] top-[23%] h-[28%] w-[22%] rounded-[45%_45%_3px_3px] bg-[#b3b7a4]" />
                <div className="absolute bottom-[15%] left-[9%] h-[21%] w-[58%] rounded-[48%_48%_16px_16px] bg-[#eee8dc] shadow-[0_20px_28px_rgba(43,46,37,0.2)]" />
                <div className="absolute bottom-[11%] left-[16%] h-[13%] w-[44%] rounded-[40%] bg-[#8c7861]" />
                <div className="absolute bottom-[8%] right-[12%] h-[31%] w-[12%] rounded-t-full bg-[#435748]" />
                <div className="absolute bottom-[8%] right-[8%] h-[19%] w-[20%] rounded-t-full bg-[#60715e]" />
                <div className="absolute bottom-[7%] left-[7%] rounded-full border border-white/50 bg-[#f4f1eb]/85 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#344238] backdrop-blur">
                  Material & mood concept
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4 text-[10px] uppercase tracking-[0.18em] text-[#686b61] sm:px-3">
                <span>Warm neutrals · Natural textures</span>
                <span>01 / 03</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-[#d8d3c9] bg-[#f8f6f0] p-4 shadow-xl sm:block sm:-left-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#7a806f]">The starting point</p>
              <p className="mt-1 font-serif text-xl italic text-[#344238]">A clearer plan.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#d8d3c9] bg-[#ebe7de]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-7 text-xs text-[#62685e] sm:px-8 md:grid-cols-4 lg:px-12">
            {["Interior refreshes", "Room-by-room planning", "Renovation direction", "Finishing details"].map((item) => (
              <p key={item} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-[#9b8665]" />{item}</p>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d684c] sm:text-xs">What we can help with</p>
              <h2 className="mt-4 max-w-xl text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">Make the important spaces work better.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#686d63]">Start with the room or renovation that matters most. The right scope begins with understanding what you need.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="group rounded-[1.5rem] border border-[#d8d3c9] bg-[#f8f6f0] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#aaa18f] hover:shadow-[0_18px_40px_rgba(49,54,44,0.08)] sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9b8665]">{service.number}</span>
                  <ArrowUpRight size={18} className="text-[#8a8e82] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#344238]" aria-hidden="true" />
                </div>
                <h3 className="mt-12 text-2xl font-medium tracking-[-0.03em]">{service.title}</h3>
                <p className="mt-4 min-h-[84px] text-sm leading-7 text-[#686d63]">{service.description}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {service.tags.map((tag) => <span key={tag} className="rounded-full border border-[#ded9ce] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#6d7368]">{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="approach" className="bg-[#344238] text-[#f4f1eb]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d5c4a5] sm:text-xs">A straightforward process</p>
              <h2 className="mt-4 max-w-md text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">Good decisions, in the right order.</h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-[#d0d4ca]">No assumptions about what your project needs. We start with the space, the priorities and the practical details.</p>
            </div>
            <div className="divide-y divide-white/15 border-y border-white/15">
              {steps.map(([number, title, description]) => (
                <div key={number} className="grid gap-3 py-6 sm:grid-cols-[60px_1fr] sm:gap-5">
                  <span className="font-mono text-xs text-[#d5c4a5]">{number}</span>
                  <div>
                    <h3 className="text-xl font-medium">{title}</h3>
                    <p className="mt-2 max-w-lg text-sm leading-7 text-[#d0d4ca]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <div className="overflow-hidden rounded-[2rem] bg-[#e4ddcf] p-7 sm:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#7d684c] sm:text-xs"><Sparkles size={14} aria-hidden="true" /> Start with a conversation</p>
                <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.05em] sm:text-6xl">Have a space in mind?</h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-[#62685e] sm:text-base">Tell us what you would like to improve, what is already in place and what a successful result would look like to you.</p>
              </div>
              <a
                href="mailto:hello@example.com?subject=Enquiry%20from%20the%20Cedar%20%26%20Stone%20concept%20demo"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#344238] px-7 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#202b23] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#344238]"
              >
                Send a sample enquiry <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-12 grid gap-5 border-t border-[#c9c0b1] pt-6 text-xs text-[#62685e] sm:grid-cols-3">
              <p className="flex items-center gap-2"><MapPin size={15} aria-hidden="true" /> Location details supplied by client</p>
              <p className="flex items-center gap-2"><Phone size={15} aria-hidden="true" /> Approved phone / WhatsApp link</p>
              <p className="flex items-center gap-2"><Clock3 size={15} aria-hidden="true" /> Response hours agreed in advance</p>
            </div>
            <p className="mt-7 text-[10px] leading-5 text-[#74786f]">Demo note: hello@example.com and the contact details above are placeholders. Replace them with approved business details before any real-world use.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d8d3c9] px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-[10px] uppercase tracking-[0.16em] text-[#74786f] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold tracking-[0.2em] text-[#344238]">CEDAR & STONE · CONCEPT</span>
          <span>Fictional business · Sample copy · Not client work</span>
          <a href="#main" className="underline decoration-[#b6aa97] underline-offset-4 hover:text-[#344238]">Back to top</a>
        </div>
      </footer>
    </div>
  );
}
