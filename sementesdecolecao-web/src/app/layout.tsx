import './globals.css';

export const metadata = {
  title: 'Coruja Genetics & Seeds | sementesdecolecao.com',
  description: 'Preservação Genética e Sementes de Coleção Exclusivas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-neutral-950 text-neutral-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
