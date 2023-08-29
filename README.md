# Windows Up-to-Date

![开源协议](https://img.shields.io/github/license/crrashh1542/win-uptime)
![当前版本](https://img.shields.io/github/package-json/v/crrashh1542/win-uptime)
![Release 版本](https://img.shields.io/github/v/release/crrashh1542/win-uptime?include_prereleases)
![框架](https://img.shields.io/badge/framework-Vue%203-3fb984)

## 说明
如你所见，这是一个用于反映 Windows 系统各版本情况实时进展的项目。  
  
这是受到 [ChangeWindows](https://changewindows.org) 项目启发而制作的一个便民项目，也算作我的一个 Vue 3 练手项目 ~~（为自己代码质量低找借口）~~。由于目前在测试阶段，所以可能会出现较多的 bug，敬请谅解~  
  
关于版本详情，请见[更新日志](../data/CHANGELOG.md)。
  
## 部署
若要下载已打包好的源代码，请移步 [Releases](https://github.com/crrashh1542/win-up-to-date/releases)。  
  
若要自行打包，需要注意以下几点：
* 必须要将项目 clone 下来，使用 zip 源代码下载方式会导致 prebuild 环节出错。
* 请将 Yarn 版本调整至 berry (v2+)。
```bash
yarn set version berry
```
* 启动开发、生产模式的命令请见 `package.json`。