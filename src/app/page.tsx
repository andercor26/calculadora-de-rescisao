import { Calculadora } from "@/components/Calculadora";
import { Diferenciais } from "@/components/Diferenciais";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VerbasGrid } from "@/components/VerbasGrid";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Calculadora />
        <VerbasGrid />
        <Diferenciais />
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
