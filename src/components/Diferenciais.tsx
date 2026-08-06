const ITENS = [
  {
    titulo: "Baseado na CLT",
    texto: "As fórmulas seguem as regras gerais da Consolidação das Leis do Trabalho e da Lei 12.506/2011.",
  },
  {
    titulo: "Cálculo instantâneo",
    texto: "O recibo é atualizado a cada campo preenchido, sem precisar apertar nenhum botão.",
  },
  {
    titulo: "Sem cadastro",
    texto: "Nenhum dado é enviado a um servidor: tudo é calculado diretamente no seu navegador.",
  },
  {
    titulo: "Estimativa clara",
    texto: "Mostramos cada verba separadamente, com a lógica usada em cada cálculo.",
  },
];

export function Diferenciais() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {ITENS.map((item) => (
            <div
              key={item.titulo}
              className="rounded-xl border border-line bg-paper-muted p-6"
            >
              <h3 className="font-display text-base font-semibold text-navy-950">
                {item.titulo}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
