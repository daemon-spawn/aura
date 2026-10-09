import type { Metadata } from "next";
import { faq } from "@/content/faq";
import { PageIntro } from "@/components/sections/PageIntro";
import { LocalTime } from "@/components/ui/LocalTime";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { FaqSection } from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description: "Tell me about your business and what you need. I reply personally to set up a discovery call — no pitch, no obligation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        meta={<LocalTime />}
        title={<>Book a <span className="serif">discovery</span> call.</>}
        lead="Tell me a little about your business and what you need. I'll reply personally to set up a time."
      />
      <ContactPanel />
      <FaqSection items={faq.filter((f) => f.key)} id="contact-faq" title="Common questions." />
    </>
  );
}
