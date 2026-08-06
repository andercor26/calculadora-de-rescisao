export function PageHeader({
  eyebrow,
  titulo,
  descricao,
}: {
  eyebrow: string;
  titulo: string;
  descricao: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-navy-950 py-16 text-white md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
          {eyebrow}
        </span>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
          {titulo}
        </h1>
        <p className="mt-4 max-w-xl text-white/70">{descricao}</p>
      </div>
    </section>
  );
}
