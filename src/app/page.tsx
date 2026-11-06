import { CULTIVARS } from '@/data/catalog';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      <header className="border-b border-neutral-800/80 bg-neutral-950/70 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <span className="text-xl font-black tracking-wider text-white uppercase">Coruja Genetics & Seeds</span>
            <span className="block text-xs text-neutral-400">sementesdecolecao.com</span>
          </div>
          <span className="text-xs font-mono uppercase bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full border border-neutral-700">
            Catálogo de Preservação
          </span>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-20 pb-14 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">
          Genética Exclusiva & Preservação Botânica
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Cultivares estabilizados e seleções aromáticas desenvolvidos com rigor técnico para colecionadores e entusiastas genéticos.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CULTIVARS.map((item) => (
            <article key={item.id} className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">{item.badge}</span>
                <h2 className="text-2xl font-bold text-white mb-1 mt-2">{item.name}</h2>
                <p className="text-sm font-mono text-neutral-400 mb-4">{item.lineage}</p>
                <p className="text-sm text-neutral-300 leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 text-center text-xs text-neutral-500">
        <p>© 2026 Coruja Genetics & Seeds. Todos os direitos reservados.</p>
        <p className="mt-1 text-neutral-600">Material destinado exclusivamente a fins de preservação genética e coleção botânica.</p>
      </footer>
    </main>
  );
}
