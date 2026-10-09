import type { Metadata } from "next";
import { faq } from "@/content/faq";
import { PageIntro } from "@/components/sections/PageIntro";
import { Services } from "@/components/sections/Services";
import { ServiceList } from "@/components/sections/ServiceList";
import { Process } from "@/components/sections/Process";
import { FaqSection } from "@/components/sections/FaqSection";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Presence, Commerce and Systems — premium websites, ecommerce and the software behind them, designed and engineered by one person in Johannesburg. Projects from R8,000.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        meta="Presence · Commerce · Systems"
        title={<>The website, the store and the <span className="serif">system</span> behind them.</>}
        lead="Start with whichever your business needs most. Every line can include Care, so the work keeps performing after launch."
      />
      <Services />
      <ServiceList id="all-services" />
      <Process />
      <FaqSection items={faq} />
      <Contact />
    </>
  );
}
