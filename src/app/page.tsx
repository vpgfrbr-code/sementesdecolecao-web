'use client';

import React, { useState } from 'react';
import { CULTIVARS, Cultivar } from '@/data/catalog';
import PixCheckout from '@/components/PixCheckout';

export default function Home() {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div>
            <span className="text-xl font-black tracking-wider text-white uppercase">Coruja Genetics & Seeds</span>
            <span className="block text-xs text-neutral-400">sementesdecolecao.com</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => totalItems > 0 && setIsCheckoutOpen(true)}
              className={`px-4 py-2 rounded-full font-bold text-xs transition border flex items-center gap-2 ${
                totalItems > 0
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 hover:bg-amber-300'
                  : 'bg-neutral-900 text-neutral-500 border-neutral-800 cursor-not-allowed'
              }`}
            >
              <span>🛒 Carrinho ({totalItems})</span>
              {totalAmount > 0 && <span>- R$ {totalAmount.toFixed(2).replace('.', ',')}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Genética Exclusiva & Preservação Botânica
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Cultivares estabilizados e seleções botânicas para colecionadores. Pagamento direto e seguro via PIX oficial.
        </p>
      </section>

      {/* Catálogo */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CULTIVARS.map((item) => (
            <article key={item.id} className="border border-neutral-800 bg-neutral-900/40 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">{item.badge}</span>
                <h2 className="text-2xl font-bold text-white mb-1 mt-2">{item.name}</h2>
                <p className="text-sm font-mono text-neutral-400 mb-3">{item.lineage}</p>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">{item.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60">
                <span className="text-2xl font-black text-amber-400">
                  R$ {item.price.toFixed(2).replace('.', ',')}
                </span>

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
                    className="px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 font-bold text-sm hover:bg-amber-300 transition"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal PIX */}
      {isCheckoutOpen && (
        <PixCheckout
          totalAmount={totalAmount}
          pixKey="vpg710@gmail.com"
          beneficiaryName="Coruja Seeds"
          city="Phuket"
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950 py-10 text-center text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} Coruja Genetics & Seeds. sementesdecolecao.com</p>
        <p className="mt-1 text-neutral-600">Material destinado exclusivamente a fins de preservação genética e coleção botânica.</p>
      </footer>
    </main>
  );
}
