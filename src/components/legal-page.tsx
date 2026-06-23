import { PageHero } from "./page-hero";

export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: Array<[string, string]> }) {
  return <><PageHero title={title} description={intro} /><article className="section"><div className="container max-w-3xl"><div className="mb-8 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">Draft for professional legal review before launch. Legal entity name and governing jurisdiction are pending client confirmation.</div><p className="mb-10 text-sm text-[#777]">Last updated: June 23, 2026</p><div className="space-y-9">{sections.map(([heading, text]) => <section key={heading}><h2 className="font-heading text-2xl font-black">{heading}</h2><p className="mt-3 leading-7 text-[#555]">{text}</p></section>)}</div><p className="mt-10 text-sm">Questions: <a className="font-bold text-[#8b6800]" href="mailto:info@titlecheckpro.com">info@titlecheckpro.com</a></p></div></article></>;
}
