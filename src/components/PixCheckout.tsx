'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generatePixPayload } from '@/lib/pix';

interface PixCheckoutProps {
  totalAmount: number;
  pixKey: string;
  beneficiaryName: string;
  city: string;
  onClose: () => void;
}

export default function PixCheckout({
  totalAmount,
  pixKey,
  beneficiaryName,
  city,
  onClose,
}: PixCheckoutProps) {
  const [copied, setCopied] = useState(false);

  const pixCode = generatePixPayload({
    pixKey,
    merchantName: beneficiaryName,
    merchantCity: city,
    amount: totalAmount,
    txId: 'CORUJA' + Date.now().toString().slice(-6),
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-5">
          <div>
            <h3 className="text-xl font-bold text-white">Pagamento via PIX</h3>
            <p className="text-xs text-neutral-400">Padrão Oficial Banco Central do Brasil</p>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-lg font-bold p-1"
          >
            ✕
          </button>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-center mb-6">
          <span className="text-xs text-neutral-400 uppercase tracking-widest block mb-1">
            Total a Pagar
          </span>
          <span className="text-3xl font-extrabold text-amber-400">
            R$ {totalAmount.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl w-fit mx-auto mb-6 shadow-inner">
          <QRCodeSVG value={pixCode} size={210} level="M" />
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
            {copied ? '✓ Código PIX Copiado!' : 'Copiar Código PIX (Copia e Cola)'}
          </button>

          <p className="text-center text-[11px] text-neutral-400 leading-relaxed px-2">
            Abra o app do seu banco, escolha <strong>Pagar via PIX</strong> e aponte a câmara para o QR Code ou cole o código acima.
          </p>
        </div>
      </div>
    </div>
  );
}
