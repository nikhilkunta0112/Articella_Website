import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Shared by the Primary Care and Memberships pages: a bordered list of question rows.
export default function FaqAccordion({ items }) {
  return (
    <Accordion className="divide-y divide-border rounded-2xl border border-border bg-background">
      {items.map((f) => (
        <AccordionItem key={f.q} value={f.q} className="border-0 px-5 sm:px-6">
          <AccordionTrigger className="items-center gap-4 py-5 text-base font-medium text-foreground hover:no-underline sm:text-[1.0625rem]">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-[1rem] leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
