function formatField(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0');
  return `${id}${len}${value}`;
}

function calculateCRC16(payload: string): string {
  let crc = 0xffff;
  const polynomial = 0x1021;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ polynomial) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

export interface PixOptions {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  txId?: string;
}

export function generatePixPayload({
  pixKey,
  merchantName,
  merchantCity,
  amount,
  txId = '***',
}: PixOptions): string {
  const cleanName = merchantName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').slice(0, 25);
  const cleanCity = merchantCity.normalize('NFD').replace(/[\u0300-\u036f]/g, '').slice(0, 15);
  const formattedAmount = amount.toFixed(2);

  const gui = formatField('00', 'br.gov.bcb.pix');
  const key = formatField('01', pixKey);
  const merchantAccountInfo = formatField('26', `${gui}${key}`);
  const additionalDataField = formatField('62', formatField('05', txId));

  const rawPayload = [
    formatField('00', '01'),
    merchantAccountInfo,
    formatField('52', '0000'),
    formatField('53', '986'),
    formatField('54', formattedAmount),
    formatField('58', 'BR'),
    formatField('59', cleanName),
    formatField('60', cleanCity),
    additionalDataField,
    '6304',
  ].join('');

  return `${rawPayload}${calculateCRC16(rawPayload)}`;
}
