# Windows Up-to-Date

![当前版本](https://img.shields.io/github/package-json/v/crrashh1542/win-up-to-date)
![上次提交](https://badgen.net/github/last-commit/crrashh1542/win-up-to-date)
![开源协议](https://img.shields.io/github/license/crrashh1542/win-up-to-date)
![CI状态](https://github.com/crrashh1542/win-up-to-date/actions/workflows/build.yml/badge.svg)

## 关于

如你所见，Windows Up-to-Date 是一个用于反映 Windows 系统各版本情况实时进展的项目。

这是受到 [ChangeWindows](https://changewindows.org) 启发而制作的一个便民项目，技术栈为：[Vue 3](https://github.com/vuejs/core) + [Vue Router 4](https://github.com/vuejs/router)。由于该项目练手用~~（为自己代码质量低找借口）~~，欢迎各位提 issue 和 PR！

## 部署

若要下载已打包好的代码，请移步 [Releases](https://github.com/crrashh1542/win-up-to-date/releases)。

若要自行打包，需要注意须要将项目 clone 下来，使用 zip 源代码下载方式会导致 prebuild 环节出错。

```bash
git clone https://github.com/crrashh1542/win-up-to-date --depth=1
cd win-up-to-date
npm install pnpm -g
pnpm install
```

启动各环境的命令详见 [`package.json`](./package.json)，~~测试环境以后会加上的！~~

## 分支相关

`wu` 开头的分支为开发分支，如
[`wu_main`](https://github.com/crrashh1542/win-up-to-date/tree/wu_main) 是本项目的主线分支。

以代号开头的分支为某版本阶段的发布分支（即所有 Releases 都经由此分支），以下列表内加粗行表示为当前工作进行的分支。
| 代号简写 | 代号 | 范围 |
|----------|---------------|---------------|
| **`th`** | **Threshold** | **v0.x** |
| **`hb`** | **Hibiscus**  | **v1.0** |
