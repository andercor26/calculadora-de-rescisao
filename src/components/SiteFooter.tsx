export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-12 text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-600" />
              <span className="font-display text-lg font-semibold text-white">
                Recibo Certo
              </span>
            </div>
            <p className="mt-2 max-w-sm text-sm leading-relaxed">
              Ferramenta educativa e gratuita para estimar verbas rescisórias
              conforme as regras gerais da CLT.
            </p>
          </div>

          <nav className="flex gap-6 text-sm">
            <a href="#verbas" className="hover:text-white">
              O que é calculado
            </a>
            <a href="#calculadora" className="hover:text-white">
              Calculadora
            </a>
            <a href="#duvidas" className="hover:text-white">
              Dúvidas
            </a>
          </nav>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed">
          Recibo Certo não é um escritório de advocacia e os resultados
          apresentados são estimativas para fins informativos, sem valor
          jurídico ou substituição de aconselhamento profissional
          individualizado.
        </p>
      </div>
    </footer>
  );
}
