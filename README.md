# Windows Up-to-Date

![开源协议](https://img.shields.io/github/license/crrashh1542/win-uptime)
![当前版本](https://img.shields.io/github/package-json/v/crrashh1542/win-uptime)
![Release 版本](https://img.shields.io/github/v/release/crrashh1542/win-uptime?include_prereleases)
![框架](https://img.shields.io/badge/framework-Vue%203-3fb984)

## 关于
如你所见，这是一个用于反映 Windows 系统各版本情况实时进展的项目。  
  
这是受到 [ChangeWindows](https://changewindows.org) 项目启发而制作的一个便民项目，也算作我的一个 [Vue 3](https://github.com/vuejs/core) + [Vue Router 4](https://github.com/vuejs/router) + [Fluent UI Web Component 2](https://github.com/microsoft/fluentui/tree/master/packages/web-components) 的一个练手项目 ~~（为自己代码质量低找借口）~~。由于目前在测试阶段，所以可能会出现较多的 bug，敬请谅解 :(  

当然啦，咱也灰常欢迎大佬们的 [issue](https://github.com/crrashh1542/win-up-to-date/issues) 和 [PR](https://github.com/crrashh1542/win-up-to-date/pulls) 啦~  
  
## 部署
若要下载已打包好的源代码，请移步 [Releases](https://github.com/crrashh1542/win-up-to-date/releases)。  
  
若要自行打包，需要注意以下几点：
* 必须要将项目 clone 下来，使用 zip 源代码下载方式会导致 prebuild 环节出错。
* 请将 Yarn 版本调整至 berry (v2+)。
```bash
yarn set version berry
```
* 启动各环境的命令详见 [`package.json`](./package.json)。~~测试环境以后会加上的~~

## 分支相关
`wu` 开头的分支为开发分支，如 
[`wu_main`](https://github.com/crrashh1542/win-up-to-date/tree/wu_main) 就是本项目的主线分支。

以代号开头的分支为某特定代号下版本的版本发布分支，以下列表内加粗行表示为当前工作进行的分支。
| 代号简写  | 代号          | 范围          |
|----------|---------------|---------------|
| **`th`** | **Threshold** | **v0 ~ v1.0** |
