import { init, parse } from 'es-module-lexer';
import MagicString from 'magic-string';
import type { PluginOption } from 'vite';

interface Options {
  client?: string[],
  server?: string[],
}

export function isomorphicImport({client, server}: Options): PluginOption {
  return {
    name: 'vite-plugin-isomorphic-import',
    enforce: 'post',
    async transform(code, id, opts) {
      const ssr = opts.ssr;

      await init;

      let _s;
      const s = () => _s || (_s = new MagicString(code));
      const [imports] = parse(code);

      for (const i of imports) {
        if (!i.n || i.d !== -1) continue;
        
        if ((ssr && client[i.n]) || (!ssr && server[i.n])) {
          s().overwrite(i.ss, i.se, '')
        }
      }

      if (_s) {
        return {
          code: _s.toString(),
          map: _s.generateMap()
        }
      }
    }
  }
}