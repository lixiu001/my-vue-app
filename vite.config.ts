import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import fs from 'node:fs';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

import electron from "vite-plugin-electron"
import electronRenderer from "vite-plugin-electron-renderer" 
import polyfillExports from "vite-plugin-electron-renderer"


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true });
  return {
    base: mode == 'development' ? '' : './',
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      electron([{
        entry: "electron/main.js", // 主进程文件
      },
      {
        entry: 'electron/preload.js'
      }]),
      electronRenderer(),
      polyfillExports(),
    ],
    build: {
      emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
      outDir: "dist-electron"
    },
      // electron({
      //   main: {
      //     entry: 'electron/main.js',
      //     vite: {
      //       build: {
      //         sourcemap,
      //         minify: isBuild,
      //         outDir: 'dist-electron/main',
      //         rollupOptions: {
      //           external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
      //         },
      //       },
      //     },
      //   },
      // })
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
      }
    },
    
    server: {
      port: 5174, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'http://xxx.xxx.xxx.xxx:8000',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace('/api/', '/')
      //   }
      // }
    }

  }

})
