import { build, emptyDir } from '@deno/dnt'

await emptyDir('./npm')

await build({
  entryPoints: ['./main.ts'],
  outDir: './npm',
  test: false,
  shims: {
    // see JS docs for overview and more options
    deno: true,
    // undici: true,
  },
  importMap: 'deno.jsonc',
  package: {
    // package.json properties
    name: 'test-deno-hono',
    version: Deno.args[0],
    description: 'test-deno-hono',
  },
  filterDiagnostic(diagnostic) {
    if (
      diagnostic.file?.fileName.endsWith(
        'src/deps/deno.land/x/redis@v0.32.4/connection.ts',
      )
    ) {
      return false
    } else {
      return true
    }
  },
})
