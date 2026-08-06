const VERBAS = [
  {
    titulo: "Saldo de salário",
    texto: "Valor proporcional aos dias efetivamente trabalhados no mês em que o contrato termina.",
  },
  {
    titulo: "Aviso prévio",
    texto: "30 dias + 3 por ano completo de casa (até 90 dias), indenizado ou trabalhado, quando devido.",
  },
  {
    titulo: "13º salário proporcional",
    texto: "Um doze avos do salário para cada mês trabalhado no ano, com fração igual ou maior que 15 dias.",
  },
  {
    titulo: "Férias + 1/3",
    texto: "Proporcionais ao período aquisitivo em curso e vencidas se houver, sempre com o terço constitucional.",
  },
  {
    titulo: "FGTS e multa de 40%",
    texto: "Saldo depositado ao longo do contrato, liberado com multa de 40% na dispensa sem justa causa.",
  },
  {
    titulo: "Justa causa x sem justa causa",
    texto: "O motivo do desligamento muda quais verbas são devidas. A calculadora ajusta isso automaticamente.",
  },
];

export function VerbasGrid() {
  return (
    <section id="verbas" className="bg-navy-950 py-20 text-white md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
            O que é calculado
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Cada verba, explicada em uma frase
          </h2>
          <p className="mt-3 text-white/60">
            A calculadora combina essas regras de acordo com o tipo de
            desligamento que você informar.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VERBAS.map((v) => (
            <div
              key={v.titulo}
              className="rounded-xl border border-white/10 bg-navy-800/60 p-6 transition hover:border-red-600/50"
            >
              <h3 className="font-display text-lg font-semibold">{v.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{v.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
