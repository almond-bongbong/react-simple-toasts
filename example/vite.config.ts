import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as fs from 'fs';
import * as path from 'path';

function getCssFilenames(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((filename) => filename.endsWith('.css'))
    .map((filename) => filename.replace('.css', ''));
}

function extractThemeName() {
  return {
    name: 'css-filenames-plugin',
    configResolved(resolvedConfig) {
      // 빌드가 시작될 때 실행됩니다.
      const dirPath = path.resolve(
        resolvedConfig.root,
        'node_modules/react-simple-toasts/dist/theme',
      );
      const filenames = getCssFilenames(dirPath);

      // JSON 파일로 내보냅니다.
      fs.writeFileSync(
        path.resolve(resolvedConfig.root, 'src/assets/themes.json'),
        JSON.stringify(filenames),
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), extractThemeName()],
  build: {
    outDir: 'build',
  },
  base: './',
});
