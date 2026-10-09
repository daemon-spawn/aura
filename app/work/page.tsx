import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { PageIntro } from "@/components/sections/PageIntro";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Websites, business systems and ongoing care for South African companies — KRDF ProSuite, Bee-Hill College, Mazhwetu General Works and Kane Solutions.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Success stories"
        meta={<>{String(projects.length).padStart(2, "0")} projects</>}
        title={<>Every project here is <span className="serif">real</span>.</>}
        lead="Built, in build, or being looked after every month. Each one started with a business whose presence hadn't caught up yet."
      />
      <SuccessStories projects={projects} showAllLink={false} id="stories" />
      <Contact />
    </>
  );
}
