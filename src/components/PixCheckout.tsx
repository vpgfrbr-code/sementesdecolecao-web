'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePixPayload } from '@/lib/pix';

interface CartItem {
  name: string;
  qty: number;
  price: number;
}

interface PixCheckoutProps {
  totalAmount: number;
  items: CartItem[];
  pixKey: string;
  beneficiaryName: string;
  city: string;
  onClose: () => void;
}

export default function PixCheckout({
  totalAmount,
  items,
  pixKey,
  beneficiaryName,
  city,
  onClose,
}: PixCheckoutProps) {
  const [step, setStep] = useState<'info' | 'pix'>('info');
  const [copied, setCopied] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientWhatsapp, setClientWhatsapp] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderId] = useState(() => 'CRJ-' + Math.floor(100000 + Math.random() * 900000));

  const pixCode = generatePixPayload({
    pixKey,
    merchantName: beneficiaryName,
    merchantCity: city,
    amount: totalAmount,
    txId: orderId.replace('-', ''),
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(false);
    }
  };

  const handleAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim() && clientWhatsapp.trim()) {
      setStep('pix');
    }
  };

  const orderSummaryText = items.map(i => `${i.qty}x ${i.name}`).join(', ');
  const whatsappMsg = encodeURIComponent(
    `Olá Coruja Seeds! Realizei o pedido ${orderId}.\n\nCliente: ${clientName}\nItens: ${orderSummaryText}\nTotal: R$ ${totalAmount.toFixed(2).replace('.', ',')}\nEndereço: ${shippingAddress}\n\nSegue comprovativo do PIX em anexo.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-100 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
          <div>
            <h3 className="text-xl font-bold text-white">
              {step === 'info' ? 'Dados para Envio & Contato' : 'Pagamento via PIX'}
            </h3>
            <p className="text-xs text-neutral-400">
              Pedido: <span className="font-mono text-amber-400 font-semibold">{orderId}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        {step === 'info' ? (
          <form onSubmit={handleAdvance} className="space-y-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
              <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-2 font-semibold">Resumo do Pedido</span>
              <ul className="text-sm space-y-1 text-neutral-300">
                {items.map((i, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{i.qty}x {i.name}</span>
                    <span className="font-mono text-neutral-400">R$ {(i.price * i.qty).toFixed(2).replace('.', ',')}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-neutral-800 mt-3 pt-2 flex justify-between font-bold text-white">
                <span>Total</span>
                <span className="text-amber-400">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1 font-semibold">Nome Completo *</label>
              <input
                required
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex: João Silva"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1 font-semibold">WhatsApp (com DDD) *</label>
              <input
                required
                type="tel"
                value={clientWhatsapp}
                onChange={(e) => setClientWhatsapp(e.target.value)}
                placeholder="(XX) 9XXXX-XXXX"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1 font-semibold">Endereço de Entrega Completo *</label>
              <textarea
                required
                rows={2}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Rua, Número, Complemento, Bairro, Cidade, Estado e CEP"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl font-bold bg-amber-400 text-neutral-950 hover:bg-amber-300 transition text-sm mt-2"
            >
              Avançar para Pagamento PIX →
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-center">
              <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-1">
                Total a Pagar via PIX
              </span>
              <span className="text-3xl font-extrabold text-amber-400">
                R$ {totalAmount.toFixed(2).replace('.', ',')}
              </span>
              <span className="block text-xs text-neutral-400 mt-1">Beneficiário: {beneficiaryName}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl w-fit mx-auto shadow-inner">
              <QRCodeSVG value={pixCode} size={200} level="M" />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCopy}
                className={`w-full py-3.5 px-4 rounded-xl font-bold transition flex items-center justify-center gap-2 text-sm ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-400 text-neutral-950 hover:bg-amber-300'
                }`}
              >
                {copied ? '✓ Código PIX Copiado!' : 'Copiar Chave PIX (Copia e Cola)'}
              </button>

              <a
                href={`https://wa.me/5511999999999?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold bg-emerald-600/20 text-emerald-400 border border-emerald-600/40 hover:bg-emerald-600/30 transition flex items-center justify-center gap-2 text-xs"
              >
                💬 Confirmar Pedido / Enviar Comprovativo no WhatsApp
              </a>

              <p className="text-center text-[11px] text-neutral-400 leading-relaxed pt-2 border-t border-neutral-800">
                Após efetuar o pagamento, envie o comprovativo pelo botão de WhatsApp acima para agilizar o envio imediato.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
