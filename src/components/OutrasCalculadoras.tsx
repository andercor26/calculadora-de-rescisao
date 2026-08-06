import Link from "next/link";
import { CALCULADORAS } from "@/lib/calculadoras";

export function OutrasCalculadoras({ atual }: { atual: string }) {
  const outras = CALCULADORAS.filter((c) => c.slug !== atual);

  return (
    <section id="outras" className="border-t border-line bg-paper py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-red-600">
          Outras calculadoras
        </span>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-navy-950">
          Continue calculando seus direitos
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outras.map((c) => (
            <Link
              key={c.slug}
              href={c.slug}
              className="group rounded-xl border border-line bg-paper-muted p-6 transition hover:border-red-600/50"
            >
              <h3 className="font-display text-base font-semibold text-navy-950 group-hover:text-red-600">
                {c.tituloCurto}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.descricao}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
