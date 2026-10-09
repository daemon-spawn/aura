import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, getNextProject } from "@/content/projects";
import { CaseHero } from "@/components/sections/case/CaseHero";
import { CaseNarrative } from "@/components/sections/case/CaseNarrative";
import { NextProject } from "@/components/sections/case/NextProject";
import { Contact } from "@/components/sections/Contact";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.name} — AURA`, description: project.summary },
  };
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.slug === slug);

  return (
    <>
      <CaseHero project={project} index={index} />
      <CaseNarrative project={project} />
      <NextProject project={getNextProject(slug)} />
      <Contact
        title={
          <>
            <span style={{ display: "block" }}>Something like this</span>
            <span style={{ display: "block" }}>
              in <span className="serif">your</span> business?
            </span>
          </>
        }
      />
    </>
  );
}
