# Sample Porject for ONAYLARIM coreAPI

ONAYLARIM coreAPI için örnek istemci (browser) uygulamasıdır.

![image](https://github.com/DanialHuckabee/CoreApiCustomerVue/assets/14294898/dc7c4193-7399-4c3d-b39f-291aeb1b8aef)

## Başlarken

Sunucu tarafı için [Sunucu Projesini](https://github.com/DanialHuckabee/CoreApiCustomerApi) indirin.

Koddaki `API_URL` değişkenlerini sunucu tarafı projesinin URL'sine güncelleyin.

ONAYLARIM e-İmza Aracı, yalnızca onaylanmış URL'lerden gelen istekleri kabul eder. Bu nedenle lütfen bize istemci tarafı uygulamanızın URL'sini gönderin.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
