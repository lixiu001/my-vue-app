import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import fs from 'node:fs';
import electron from 'vite-plugin-electron/simple';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync('dist-electron', { recursive: true, force: true });
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG
  console.log(process.env.VSCODE_DEBUG);
  return {
    base: './', // 设置打包路径
    plugins: [
      vue(),
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
    ],
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
