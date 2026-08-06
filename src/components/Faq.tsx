const PERGUNTAS = [
  {
    pergunta: "Esse valor é exatamente o que vou receber?",
    resposta:
      "Não. É uma estimativa com base nas regras gerais da CLT. Convenções coletivas, benefícios específicos, descontos de INSS/IRRF e cláusulas do seu contrato podem alterar o valor final.",
  },
  {
    pergunta: "E se eu nunca tive carteira assinada?",
    resposta:
      "Sem registro formal, os valores só se tornam exigíveis depois do reconhecimento do vínculo empregatício pela Justiça do Trabalho. Mostramos a estimativa considerando esse reconhecimento, mas o caminho para receber é diferente — vale procurar orientação jurídica.",
  },
  {
    pergunta: "Por que a demissão por justa causa muda tanto o valor?",
    resposta:
      "Na justa causa a lei retira o direito a aviso prévio, 13º e férias proporcionais, além da multa de 40% do FGTS e do seguro-desemprego. Só ficam garantidos o saldo de salário e férias vencidas, se houver.",
  },
  {
    pergunta: "Como o saldo do FGTS é calculado se eu não sei o valor exato?",
    resposta:
      "Quando você não informa o saldo, estimamos 8% do salário por mês de contrato — uma aproximação, já que não considera reajustes salariais nem saques anteriores. O valor exato está disponível no aplicativo do FGTS.",
  },
  {
    pergunta: "Meus dados ficam salvos em algum lugar?",
    resposta:
      "Não. O cálculo roda inteiramente no seu navegador; nada é enviado ou armazenado em servidores.",
  },
];

export function Faq() {
  return (
    <section id="duvidas" className="bg-paper-muted py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
          Dúvidas frequentes
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
          Antes de continuar
        </h2>

        <div className="mt-10 divide-y divide-line border-t border-line">
          {PERGUNTAS.map((item) => (
            <details key={item.pergunta} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-navy-950">
                {item.pergunta}
                <span className="shrink-0 text-xl text-red-600 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
