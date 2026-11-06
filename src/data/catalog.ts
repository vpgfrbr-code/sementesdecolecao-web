export interface Cultivar {
  id: string;
  name: string;
  lineage: string;
  badge: string;
  description: string;
}

export const CULTIVARS: Cultivar[] = [
  {
    id: 'caxeta-beat-bx1',
    name: 'Caxeta Beat BX1',
    lineage: '(Superboof x Tropicanna Cherry) x Superboof',
    badge: 'Edição Especial Collab MC Neguinho do Kaxeta',
    description: 'Trabalho de estabilização genética com perfil terpénico de alta intensidade e notas complexas.'
  },
  {
    id: 'maracuruja',
    name: 'Maracurujá',
    lineage: 'Linhagem Selecionada',
    badge: 'Sementes de Coleção',
    description: 'Perfil tropical exuberante, aroma penetrante com acidez equilibrada de maracujá.'
  },
  {
    id: 'tropical-spritz',
    name: 'Tropical Spritz',
    lineage: 'Forbidden Fruit x Spritzer',
    badge: 'Lote Limitado',
    description: 'Doçura frutada intensa, notas cítricas e acabamento aromático refinado.'
  },
  {
    id: 'forbidden-orange',
    name: 'Forbidden Orange',
    lineage: 'Seleção Cítrica Exclusiva',
    badge: 'Coleção Regular',
    description: 'Terpenos pronunciados de laranja doce com fundo floral terroso marcante.'
  }
];
