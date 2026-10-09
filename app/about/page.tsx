import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { Statement } from "@/components/sections/Statement";
import { StudioAbout } from "@/components/sections/StudioAbout";
import { Principles } from "@/components/sections/Principles";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "AURA is Andrew Mncube — a software engineer in Johannesburg who designs, engineers and runs premium websites and business systems.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        meta="Johannesburg"
        title={<>One person. <span className="serif">Both</span> sides of the work.</>}
        lead="Design and engineering under one name — and still here after launch."
      />
      <Statement />
      <StudioAbout />
      <Principles />
      <Stack />
      <Contact />
    </>
  );
}
