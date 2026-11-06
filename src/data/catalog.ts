export interface Cultivar {
  id: string;
  name: string;
  lineage: string;
  badge: string;
  price: number;
  description: string;
}

export const CULTIVARS: Cultivar[] = [
  {
    id: 'caxeta-beat-bx1',
    name: 'Caxeta Beat BX1',
    lineage: '(Superboof x Tropicanna Cherry) x Superboof',
    badge: 'Edição Especial Collab MC Neguinho do Kaxeta',
    price: 350.00,
    description: 'Trabalho de estabilização genética com perfil terpénico de alta intensidade e notas complexas.'
  },
  {
    id: 'maracuruja',
    name: 'Maracurujá',
    lineage: 'Linhagem Selecionada',
    badge: 'Sementes de Coleção',
    price: 280.00,
    description: 'Perfil tropical exuberante, aroma penetrante com acidez equilibrada de maracujá.'
  },
  {
    id: 'tropical-spritz',
    name: 'Tropical Spritz',
    lineage: 'Forbidden Fruit x Spritzer',
    badge: 'Lote Limitado',
    price: 300.00,
    description: 'Doçura frutada intensa, notas cítricas e acabamento aromático refinado.'
  },
  {
    id: 'forbidden-orange',
    name: 'Forbidden Orange',
    lineage: 'Seleção Cítrica Exclusiva',
    badge: 'Coleção Regular',
    price: 260.00,
    description: 'Terpenos pronunciados de laranja doce com fundo floral terroso marcante.'
  }
];
