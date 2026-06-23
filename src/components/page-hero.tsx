export function PageHero({ eyebrow, title, description }: { eyebrow?: string; title: string; description: string }) {
  return <section className="bg-[#111] py-20 text-white"><div className="container max-w-3xl text-center">{eyebrow && <p className="text-xs font-black uppercase tracking-[.2em] text-[#FFC400]">{eyebrow}</p>}<h1 className="mt-4 font-heading text-4xl font-black sm:text-5xl">{title}</h1><p className="mx-auto mt-5 max-w-2xl leading-7 text-white/65">{description}</p></div></section>;
}
