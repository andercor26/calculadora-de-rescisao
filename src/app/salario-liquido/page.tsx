import type { Metadata } from "next";
import { CalculadoraSalarioLiquido } from "@/components/calc/CalculadoraSalarioLiquido";
import { PageHeader } from "@/components/calc/PageHeader";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OutrasCalculadoras } from "@/components/OutrasCalculadoras";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { buildMetadata, faqSchema, webApplicationSchema } from "@/lib/seo";

const TITLE = "Calculadora de Salário Líquido CLT";
const DESCRICAO =
  "Calculadora salário bruto x líquido 2026: descubra o valor exato com INSS e IRRF, já considerando a isenção até R$ 5.000 da Lei 15.270/2025.";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRICAO,
  path: "/salario-liquido",
});

const PERGUNTAS = [
  {
    pergunta: "É verdade que salários até R$ 5.000 ficam isentos de Imposto de Renda?",
    resposta:
      "Sim. A Lei 15.270/2025, em vigor desde janeiro de 2026, zera o IRRF para quem ganha até R$ 5.000 por mês. Entre R$ 5.000 e R$ 7.350 o imposto é reduzido gradualmente, até voltar à tabela normal acima desse valor. Esta calculadora já aplica essa regra.",
  },
  {
    pergunta: "Qual a diferença entre salário bruto e líquido?",
    resposta:
      "O salário bruto é o valor total combinado no contrato, antes de qualquer desconto. O líquido é o que efetivamente cai na conta, depois de descontar INSS, IRRF e outros descontos previstos em lei ou no contrato.",
  },
  {
    pergunta: "Como o INSS é descontado?",
    resposta:
      "De forma progressiva: cada faixa do seu salário paga uma alíquota diferente (7,5% a 14%), até um teto máximo de contribuição. Não é uma alíquota única sobre o valor total.",
  },
  {
    pergunta: "O que é o desconto simplificado do IRRF?",
    resposta:
      "É uma dedução fixa que substitui a soma de dependentes e outras deduções. A calculadora compara os dois métodos automaticamente e usa o que resultar em menos imposto para você.",
  },
  {
    pergunta: "Por que meu contracheque pode ser diferente deste valor?",
    resposta:
      "Convenções coletivas, adiantamentos, faltas, horas extras, benefícios e descontos específicos da sua empresa não entram nesta estimativa, que considera apenas INSS e IRRF sobre o salário informado.",
  },
];

export default function SalarioLiquidoPage() {
  return (
    <>
      <JsonLd data={faqSchema(PERGUNTAS)} />
      <JsonLd data={webApplicationSchema({ name: TITLE, description: DESCRICAO, path: "/salario-liquido" })} />
      <SiteHeader />
      <main>
        <PageHeader
          eyebrow="Salário líquido"
          titulo="Quanto do seu salário bruto cai na conta?"
          descricao="Informe o salário bruto e o número de dependentes para estimar os descontos de INSS e IRRF e o valor líquido final."
        />
        <CalculadoraSalarioLiquido />
        <Faq perguntas={PERGUNTAS} titulo="Dúvidas sobre salário líquido" />
        <OutrasCalculadoras atual="/salario-liquido" />
      </main>
      <SiteFooter />
    </>
  );
}
