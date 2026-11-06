'use client';

import React, { useState, useEffect } from 'react';
import { CULTIVARS } from '@/data/catalog';
import PixCheckout from '@/components/PixCheckout';

export default function Home() {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [ageVerified, setAgeVerified] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('age_verified_coruja');
    if (!verified) {
      setAgeVerified(false);
    }
  }, []);

  const confirmAge = () => {
    localStorage.setItem('age_verified_coruja', 'true');
    setAgeVerified(true);
  };

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      if (copy[id] > 1) {
        copy[id] -= 1;
      } else {
        delete copy[id];
      }
      return copy;
    });
  };

  const totalItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
  const totalAmount = Object.entries(cart).reduce((acc, [id, qty]) => {
    const item = CULTIVARS.find((c) => c.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const cartItemsList = Object.entries(cart).map(([id, qty]) => {
    const cultivar = CULTIVARS.find((c) => c.id === id)!;
    return {
      name: cultivar.name,
      qty,
      price: cultivar.price,
    };
  });

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Modal de Confirmação de Idade (+18) */}
      {!ageVerified && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-lg">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 text-center shadow-2xl">
            <span className="text-4xl mb-4 block">🌱</span>
            <h2 className="text-2xl font-bold text-white mb-2">Aviso Legal & Idade</h2>
            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
              O conteúdo deste site destina-se exclusivamente a colecionadores e preservação botânica genética. Confirma que tem 18 anos ou mais?
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmAge}
                className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl transition text-sm"
              >
                Sim, tenho 18+
              </button>
              <button
                onClick={() => window.location.href = 'https://google.com'}
                className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-xl transition text-sm"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Fixo com Espaçamento Correto */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur fixed top-0 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-black text-lg">
              🦉
            </span>
            <div>
              <span className="text-lg font-black tracking-wider text-white uppercase block leading-none">
                Coruja Genetics & Seeds
              </span>
              <span className="text-[11px] text-neutral-400 tracking-wide font-mono">sementesdecolecao.com</span>
            </div>
          </div>

          <button
            onClick={() => totalItems > 0 && setIsCheckoutOpen(true)}
            className={`px-4 py-2.5 rounded-full font-bold text-xs transition border flex items-center gap-2 ${
              totalItems > 0
                ? 'bg-amber-400 text-neutral-950 border-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20'
                : 'bg-neutral-900 text-neutral-500 border-neutral-800 cursor-not-allowed'
            }`}
          >
            <span>🛒 Carrinho ({totalItems})</span>
            {totalAmount > 0 && <span>- R$ {totalAmount.toFixed(2).replace('.', ',')}</span>}
          </button>
        </div>
      </header>

      {/* Hero com espaçamento corrigido */}
      <section className="max-w-4xl mx-auto px-6 pt-36 pb-14 text-center">
        <div className="inline-block px-3.5 py-1 rounded-full border border-amber-400/30 bg-amber-400/5 text-amber-400 text-xs font-semibold mb-4 tracking-wide uppercase">
          Preservação Genética & Linhagens Estabilizadas
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Genética Exclusiva para Colecionadores
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Cultivares selecionados com rigor botânico e estabilização de perfis terpénicos raros. Pagamento instantâneo via PIX oficial.
        </p>
      </section>

      {/* Grid de Catálogo */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CULTIVARS.map((item) => (
            <article key={item.id} className="border border-neutral-800 bg-neutral-900/40 rounded-3xl p-7 flex flex-col justify-between hover:border-neutral-700 transition">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  {item.badge}
                </span>
                <h2 className="text-2xl font-bold text-white mb-1 mt-3">{item.name}</h2>
                <p className="text-xs font-mono text-neutral-400 mb-3 bg-neutral-950/60 w-fit px-2.5 py-1 rounded-md border border-neutral-800/80">
                  {item.lineage}
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.terpenes.map((terp, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase font-mono bg-neutral-800/60 text-neutral-400 px-2 py-0.5 rounded border border-neutral-700/50">
                      #{terp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-neutral-800/70">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Valor de Coleção</span>
                  <span className="text-2xl font-black text-amber-400">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {cart[item.id] > 0 && (
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-9 h-9 rounded-xl bg-neutral-800 text-white font-bold hover:bg-neutral-700 transition"
                    >
                      -
                    </button>
                  )}
                  {cart[item.id] > 0 && (
                    <span className="w-8 text-center font-bold text-sm">{cart[item.id]}</span>
                  )}
                  <button
                    onClick={() => addToCart(item.id)}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-sm hover:bg-amber-300 transition"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Checkout PIX */}
      {isCheckoutOpen && (
        <PixCheckout
          totalAmount={totalAmount}
          items={cartItemsList}
          pixKey="vpg710@gmail.com"
          beneficiaryName="Vincenzo Gagliardi"
          city="Phuket"
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-12 text-center text-xs text-neutral-500">
        <p className="font-semibold text-neutral-400">© {new Date().getFullYear()} Coruja Genetics & Seeds. sementesdecolecao.com</p>
        <p className="mt-2 text-neutral-600 max-w-xl mx-auto leading-relaxed">
          Material destinado exclusivamente a fins de preservação genética e coleção botânica de souvenir. Proibida a germinação onde a legislação local não permitir.
        </p>
      </footer>
    </main>
  );
}
