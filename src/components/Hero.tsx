export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/80">
            Estimativa gratuita, sem cadastro
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Quanto você tem direito a receber na sua{" "}
            <span className="text-red-600">rescisão?</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
            Esta calculadora de rescisão trabalhista mostra, em tempo real,
            uma estimativa detalhada de saldo de salário, aviso prévio, 13º,
            férias e FGTS. Considera se foi justa causa e se você tinha
            carteira assinada.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#calculadora"
              className="rounded-full bg-red-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Calcular minha rescisão
            </a>
            <a
              href="#verbas"
              className="text-sm font-medium text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white"
            >
              Ver o que entra na conta
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rotate-[3deg] rounded-2xl border border-line bg-paper p-6 text-ink shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between border-b border-dashed border-line pb-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Recibo estimativo
              </span>
              <span className="rotate-[-6deg] rounded-full border-2 border-red-600 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-red-600">
                Sem justa causa
              </span>
            </div>

            <dl className="mt-4 space-y-2.5 font-mono text-[13px]">
              {[
                ["Saldo de salário", "R$ 933,33"],
                ["Aviso prévio indenizado", "R$ 3.300,00"],
                ["13º proporcional", "R$ 1.166,67"],
                ["Férias + 1/3", "R$ 1.555,56"],
                ["Multa 40% FGTS", "R$ 1.024,00"],
              ].map(([label, valor]) => (
                <div key={label} className="flex items-baseline justify-between gap-3">
                  <dt className="text-ink-muted">{label}</dt>
                  <dd className="tabular-nums">{valor}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-line pt-3">
              <span className="font-display text-sm font-semibold">Total estimado</span>
              <span className="font-display text-xl font-semibold text-red-600 tabular-nums">
                R$ 7.979,56
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-white/40">
            Exemplo ilustrativo. Role até a calculadora para inserir seus dados
          </p>
        </div>
      </div>
    </section>
  );
}
