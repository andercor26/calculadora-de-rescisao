import Link from "next/link";
import { CALCULADORAS } from "@/lib/calculadoras";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-600" />
          <span className="font-display text-lg font-semibold tracking-tight text-navy-950">
            Calculadora do Trabalhador
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
          <a href="#calculadora" className="hover:text-navy-950">
            Calculadora
          </a>
          <div className="group relative">
            <a
              href="#outras"
              aria-haspopup="true"
              className="flex items-center gap-1 hover:text-navy-950"
            >
              Outras calculadoras
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180"
                fill="currentColor"
              >
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
              </svg>
            </a>
            <div className="invisible absolute right-0 top-full z-50 w-72 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <ul className="overflow-hidden rounded-xl border border-line bg-paper py-2 shadow-lg">
                {CALCULADORAS.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={c.slug}
                      className="block px-4 py-2.5 hover:bg-paper-muted"
                    >
                      <span className="block font-medium text-navy-950">
                        {c.tituloCurto}
                      </span>
                      <span className="block text-xs text-ink-muted">
                        {c.descricao}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <a href="#duvidas" className="hover:text-navy-950">
            Dúvidas
          </a>
        </nav>

        <a
          href="#calculadora"
          className="rounded-full bg-navy-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-navy-800"
        >
          Calcular agora
        </a>
      </div>
    </header>
  );
}
