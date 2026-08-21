# Windows Up-to-Date

![当前版本](https://img.shields.io/github/package-json/v/crrashh1542/win-up-to-date)
![上次提交](https://badgen.net/github/last-commit/crrashh1542/win-up-to-date)
![开源协议](https://img.shields.io/github/license/crrashh1542/win-up-to-date)
![CI状态](https://github.com/crrashh1542/win-up-to-date/actions/workflows/build.yml/badge.svg)

如你所见，Windows Up-to-Date 是一个用于反映 Windows 系统实时版本进展的 Web App，并集成了部分 build 的镜像下载、更新包下载和 build 搜索等功能。

这是受到 [ChangeWindows](https://changewindows.org) 启发而制作的一个便民项目，基于 Vue 3 框架。我们仍在持续为本项目设计和增加新功能，欢迎各位提 issue 和 PR！

![首页banner](./.github/images/banner-1.webp)
![平台banner](./.github/images/banner-2.webp)  
![ID-banner](./.github/images/banner-3.webp)  
![下载banner](./.github/images/banner-4.webp)  

本项目所用的图标均来自 [Fluent UI System Icons](https://github.com/microsoft/fluentui-system-icons) 和 [iconfont](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4217937)。本项目的数据托管于公开的仓库 [win-up-to-date-data](https://github.com/crrashh1542/win-up-to-date-data)，当前数据量较少，正在持续抽出精力更新数据中！如果你愿意帮助我们更新数据也欢迎加入！

## 部署
本项目需要 Node.js（版本 >= 24）和 pnpm（版本 > 9）环境。

```bash
git clone https://github.com/crrashh1542/win-up-to-date --depth=1
cd win-up-to-date
pnpm install
```

由于本项目的服务端也做了一个独立的 npm 子包，如果需要运行服务端，则也要先安装服务端相关的依赖。更详细的信息，各位可以参阅 [server/README.md](./server/README.md)
```bash
cd server/
pnpm install
# 可通过 WUTD_PORT 环境变量指定服务端的监听端口，默认端口号为 9884
WUTD_PORT=9900 pnpm start
```

然后再启动开发环境（web 服务默认端口为 9883）：
```bash
# 同时启动 web 和后端
pnpm dev
# 只启动 web 服务
pnpm dev:web
# 只启动后端数据服务
pnpm dev:api
``` 

## 分支相关

本项目尝试复制 Windows 的分支模式，分支采用 `代号/开发内容或阶段` 的命名规则。

例如，`wu` 开头的分支为主线开发分支，包含低兼容性的最新变更，如 [`wu/main`](https://github.com/crrashh1542/win-up-to-date/tree/wu/main) 是本项目的主开发分支，一般不会部署到我们的生产环境服务器。在项目中，`/` 分隔符会被替换为 `_` 号。

以其它代号开头的分支为某版本阶段的发布分支（即所有 Releases 都经由此分支），以下列表内加粗行表示为当前工作进行的分支。

| 代号简写 | 代号 | 范围 |
|----------|--------------|----------|
|   `th`   |  Threshold   |   v0.x   |
| **`hb`** | **Hibiscus** | **v1.0** |

## 声明
Windows 是 Microsoft Corporation 的注册商标，本项目与 Microsoft Corporation 和 Windows 均无任何关联。

(C) 2023-2026 crrashh1542. Licensed under [GPL-3.0](./LICENSE).
