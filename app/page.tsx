import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Clients } from "@/components/sections/Clients";
import { GapReveal } from "@/components/sections/GapReveal";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { ServiceList } from "@/components/sections/ServiceList";
import { Process } from "@/components/sections/Process";
import { FeaturedClients } from "@/components/sections/FeaturedClients";
import { FaqSection } from "@/components/sections/FaqSection";
import { Contact } from "@/components/sections/Contact";
import { getProject, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { faq } from "@/content/faq";

/**
 * Home — MONOLOG's layout, in AURA's colours, logo and voice:
 * hero → brands → statement ⟶ gap panel rises over it → success stories
 * → what I can help with → process → featured clients → FAQ (investment last) → founder ask.
 */
export default function HomePage() {
  const stories = site.homeStories.map((slug) => getProject(slug)).filter((p): p is Project => Boolean(p));
  return (
    <>
      <Hero />
      <Clients />
      {/* The statement holds still while the gap panel rises over it. */}
      <div>
        <Statement stackUnder />
        <GapReveal />
      </div>
      <SuccessStories projects={stories} />
      <ServiceList />
      <Process />
      <FeaturedClients />
      <FaqSection items={faq} />
      <Contact />
    </>
  );
}
