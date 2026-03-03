import { Hero } from "@/components/landing/hero";
import { TheSplit } from "@/components/landing/the-split";
import { Problems } from "@/components/landing/problems";
import { HowItWorks } from "@/components/landing/how-it-works";
import { PowerDistribution } from "@/components/landing/power-distribution";
import { Economics } from "@/components/landing/economics";
import { Roadmap } from "@/components/landing/roadmap";
import { CtaFooter } from "@/components/landing/cta-footer";
import { Separator } from "@/components/ui/separator";

export function HomePage() {
  return (
    <>
      <Hero />
      <TheSplit />
      <Problems />
      <div className="max-w-[1140px] mx-auto px-8">
        <Separator className="bg-border" />
      </div>
      <HowItWorks />
      <div className="max-w-[1140px] mx-auto px-8">
        <Separator className="bg-border" />
      </div>
      <PowerDistribution />
      <Economics />
      <div className="max-w-[1140px] mx-auto px-8">
        <Separator className="bg-border" />
      </div>
      <Roadmap />
      <CtaFooter />
    </>
  );
}
