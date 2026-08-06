import Link from "next/link";

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
          <a href="#duvidas" className="hover:text-navy-950">
            Dúvidas
          </a>
          <a href="#outras" className="hover:text-navy-950">
            Outras calculadoras
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
