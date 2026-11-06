import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const REPO_NAME = 'sementesdecolecao-web';
const WORK_DIR = path.resolve(process.cwd(), REPO_NAME);

function run(cmd, cwd = WORK_DIR) {
  console.log(`\n> A executar: ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

async function start() {
  console.log('=== [1/4] A restaurar ficheiros CSS Globais e Layout ===');
  const appDir = path.join(WORK_DIR, 'src', 'app');
  fs.mkdirSync(appDir, { recursive: true });

  // CSS Global com diretivas Tailwind
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #0a0a0a;
  color: #ededed;
  font-family: Arial, Helvetica, sans-serif;
}
`;
  fs.writeFileSync(path.join(appDir, 'globals.css'), globalsCss);

  // Layout Raiz garantindo a importação do globals.css
  const layoutCode = `import './globals.css';

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
`;
  fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutCode);

  console.log('\n=== [2/4] A compilar nova build estática para a pasta out ===');
  run('npm run build');

  console.log('\n=== [3/4] A atualizar repositório no GitHub ===');
  run('git add .');
  run('git commit -m "fix: restore globals.css tailwind directives and root layout"');
  run('git push origin main');

  console.log('\n✓ Build concluída e ficheiros estáticos corrigidos!');
}

start().catch(console.error);