import type { SituacaoAviso, TipoDemissao } from "./calculoRescisao";

export const TIPOS_DEMISSAO: { value: TipoDemissao; label: string }[] = [
  { value: "sem_justa_causa", label: "Sem justa causa" },
  { value: "pedido_demissao", label: "Pedido de demissão" },
  { value: "justa_causa", label: "Justa causa" },
  { value: "acordo_mutuo", label: "Acordo mútuo" },
];

export const AVISO_OPCOES: Record<TipoDemissao, { value: SituacaoAviso; label: string }[]> = {
  sem_justa_causa: [
    { value: "indenizado", label: "Indenizado (empresa dispensou o cumprimento)" },
    { value: "trabalhado", label: "Trabalhado (cumpri o período)" },
  ],
  acordo_mutuo: [
    { value: "indenizado", label: "Indenizado (pago pela metade)" },
    { value: "trabalhado", label: "Trabalhado (cumpri o período)" },
  ],
  pedido_demissao: [
    { value: "trabalhado", label: "Cumpri os 30 dias" },
    { value: "dispensado", label: "Empresa me dispensou do aviso" },
    { value: "nao_cumprido", label: "Não cumpri nem fui dispensado" },
  ],
  justa_causa: [],
};

export const ESTAMPA_TIPO_DEMISSAO: Record<TipoDemissao, string> = {
  sem_justa_causa: "Sem justa causa",
  pedido_demissao: "Pedido de demissão",
  justa_causa: "Justa causa",
  acordo_mutuo: "Acordo mútuo",
};
