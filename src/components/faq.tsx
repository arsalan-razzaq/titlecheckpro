export function FaqSection({ country }: { country?: string }) {
  const items = [
    ["What happens after I submit?", "Your request is validated and emailed to our team. Payment processing is not active yet, so the submission is treated as an enquiry."],
    ["Will every data point be available?", "No. Availability can vary by vehicle, location, source records and the information supplied. We do not guarantee that every category will contain a record."],
    ["How will I receive support?", "Email info@titlecheckpro.com with your request reference and our team can assist."],
  ];
  return <div className="mx-auto max-w-3xl divide-y divide-[#E5E5E5] rounded-2xl border border-[#E5E5E5] bg-white px-6">
    {items.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none font-heading font-black">{question}{country ? ` — ${country}` : ""}<span className="float-right text-[#b48800]">+</span></summary><p className="pt-3 text-sm leading-6 text-[#666]">{answer}</p></details>)}
  </div>;
}
