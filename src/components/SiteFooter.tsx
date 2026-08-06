import Link from "next/link";
import { CALCULADORAS } from "@/lib/calculadoras";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-12 text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-600" />
              <span className="font-display text-lg font-semibold text-white">
                Calculadora do Trabalhador
              </span>
            </div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed">
              Ferramentas educativas e gratuitas para estimar direitos
              trabalhistas conforme as regras gerais da CLT.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {CALCULADORAS.map((c) => (
              <Link key={c.slug} href={c.slug} className="hover:text-white">
                {c.tituloCurto}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed">
          Calculadora do Trabalhador não é um escritório de advocacia e os resultados
          apresentados são estimativas para fins informativos, sem valor
          jurídico ou substituição de aconselhamento profissional
          individualizado.
        </p>
      </div>
    </footer>
  );
}
