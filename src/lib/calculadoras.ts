export interface CalculadoraMeta {
  slug: string;
  titulo: string;
  tituloCurto: string;
  descricao: string;
}

export const CALCULADORAS: CalculadoraMeta[] = [
  {
    slug: "/",
    titulo: "Calculadora de Rescisão Trabalhista",
    tituloCurto: "Rescisão (CLT)",
    descricao: "Saldo de salário, aviso prévio, 13º, férias e FGTS na demissão.",
  },
  {
    slug: "/seguro-desemprego",
    titulo: "Calculadora de Seguro-Desemprego",
    tituloCurto: "Seguro-desemprego",
    descricao: "Quantas parcelas e qual o valor você tem direito a receber.",
  },
  {
    slug: "/salario-liquido",
    titulo: "Calculadora de Salário Líquido",
    tituloCurto: "Salário líquido",
    descricao: "Do salário bruto ao valor que cai na conta, com INSS e IRRF.",
  },
  {
    slug: "/horas-extras",
    titulo: "Calculadora de Horas Extras",
    tituloCurto: "Horas extras",
    descricao: "Valor da hora extra com adicional de 50%, 100% e reflexo no DSR.",
  },
  {
    slug: "/ferias",
    titulo: "Calculadora de Férias",
    tituloCurto: "Férias",
    descricao: "Valor das férias com 1/3 constitucional e abono pecuniário.",
  },
  {
    slug: "/rescisao-domestica",
    titulo: "Calculadora de Rescisão do Empregado Doméstico",
    tituloCurto: "Rescisão doméstica",
    descricao: "Verbas rescisórias específicas para quem tem empregado doméstico.",
  },
  {
    slug: "/saque-aniversario-fgts",
    titulo: "Saque-Aniversário vs. Saque-Rescisão do FGTS",
    tituloCurto: "Saque-aniversário FGTS",
    descricao: "Compare as duas modalidades antes de trocar no aplicativo do FGTS.",
  },
];
