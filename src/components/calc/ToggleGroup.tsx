"use client";

export function ToggleGroup<T extends string>({
  opcoes,
  valor,
  onChange,
  colClass = "grid-cols-2",
  ativoClass = "border-navy-950 bg-navy-950 text-white",
}: {
  opcoes: { valor: T; label: string }[];
  valor: T;
  onChange: (v: T) => void;
  colClass?: "grid-cols-2" | "grid-cols-3" | "grid-cols-4";
  ativoClass?: string;
}) {
  return (
    <div className={`grid ${colClass} gap-3`}>
      {opcoes.map((op) => (
        <button
          key={op.valor}
          type="button"
          onClick={() => onChange(op.valor)}
          className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
            valor === op.valor
              ? ativoClass
              : "border-line bg-white text-ink-muted hover:border-navy-950/40"
          }`}
        >
          {op.label}
        </button>
      ))}
    </div>
  );
}
