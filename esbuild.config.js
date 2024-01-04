import * as esbuild from 'esbuild'
import {readFile} from "node:fs/promises"
import {resolve} from "node:path"
import {test, loader} from './.loaderrc.js'


await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  platform: 'node',
  target: ['node20'],
  outfile: 'dist/index.js',
  plugins: [{
    name: "graphql",
    setup(build) {
      build.onResolve({filter: test}, ({path, resolveDir}) => ({
        path: resolve(resolveDir, path)
      }))
      build.onLoad({filter: test}, async ({path}) => ({
        contents: loader(await readFile(path, "utf8")),
      }))
    }
  }]
})