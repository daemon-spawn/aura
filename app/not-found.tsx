import { PageIntro } from "@/components/sections/PageIntro";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div style={{ paddingBottom: "var(--section)" }}>
      <PageIntro
        eyebrow="404"
        title={<>This page <span className="serif">isn&rsquo;t</span> here.</>}
        lead="It may have moved, or the link may be wrong."
      >
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <Button href="/">Back to home</Button>
          <Button href="/work" variant="text">See the work</Button>
        </div>
      </PageIntro>
    </div>
  );
}
