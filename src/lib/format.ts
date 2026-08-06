const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatBRL(valor: number): string {
  if (!Number.isFinite(valor)) return brl.format(0);
  return brl.format(valor);
}
