# Windows Up-to-Date API Server

`main.js` 是 Windows Up-to-Date 项目的数据服务端文件，默认端口为 9884。

## 运行方式
首先需要在本目录下克隆本项目的 [数据仓库](https://github.com/crrashh1542/win-up-to-date-data)，目录名称改为 `data`，然后就可以启动服务端了。

```bash
# 单独启动 API 服务
pnpm dev:api
# 同时启动 API 与前端
pnpm dev:all
```

## 接口列表

| 方法 | 路径 | 参数 | 说明 |
|------|------|------|------|
| `GET` | `/` | 无 | 服务可用性检测 |
| `GET` | `/latestBuilds` | 无 | 获取首页最新 Build 列表 |
| `GET` | `/version` | 无 | 获取数据仓库版本信息 |
| `GET` | `/category` | 无 / `platform` | 获取平台分类总览，或指定平台下的 Build 列表 |
| `GET` | `/detail` | `platform`、`build` | 获取某个 Build 的详情 |
| `GET` | `/search` | `build` | 按 Build 号前缀搜索 |

所有接口均只接受 `GET` 请求，响应格式统一为：

```json
{
  "code": 200,
  "version": 1,
  "message": "Successfully requested data!",
  "dataType": "...",
  "content": { ... }
}
```

## 路由与参数

### `/latestBuilds`

返回 [latest-builds.json](https://github.com/crrashh1542/win-up-to-date-data/blob/data/index/latest-builds.json) 的完整内容，用于首页展示。

### `/version`

返回数据仓库的版本信息，优先从 Git 提交记录读取；Git 不可用时回退到 `version.json`。

```json
{
  "hash": "f07eec5",
  "date": "2026-07-22"
}
```

### `/category`

- 无参数时返回 [category.json](https://github.com/crrashh1542/win-up-to-date-data/blob/data/index/category.json) 的完整内容，用于平台分类页面。
- 带 `platform` 参数时返回 `category/{platform}.json` 的内容，例如 `/category?platform=24H2-germanium`。

### `/detail?platform={platform}&build={build}`

返回 `detail/{platform}/{build}.json` 的内容，例如 `/detail?platform=24H2-germanium&build=26063.1`。

### `/search?build={build}`

按 Build 号前缀搜索 `detail/` 目录下的所有 JSON 文件。

```bash
curl "http://127.0.0.1:9884/search?build=26063.1"
```

返回：

```json
{
  "code": 200,
  "version": 1,
  "message": "Successfully requested data!",
  "dataType": "searchBuild",
  "content": [
    { "platform": "24H2-germanium", "build": "26063.1" }
  ]
}
```

最多返回 20 条匹配结果。

## 数据缓存

服务端使用 LRU 策略缓存已读取的 JSON 文件，以减少 IO 开销：

- 缓存键为文件的绝对路径。
- 缓存项同时记录文件 `mtime`，文件变更时自动失效并重新读取。
- 缓存容量达到 `cacheSize` 时自动清理。

## 数据版本

`/version` 通过以下顺序获取数据仓库版本：

1. 尝试执行 `git -C <dataRoot> log -1 --format=%h%n%cs`。
2. 如果 Git 不可用或不在仓库环境，读取 `<dataRoot>/version.json`。
3. 如果两者都失败，返回 `{ hash: 'unknown', date: 'unknown' }`。

## 开发提示

- 修改 [main.js](main.js) 后需要重启 `dev:api` 才能生效（Node 原生服务无热更新）。
- 若数据仓库有更新但接口返回旧数据，可能是缓存命中，可检查文件 `mtime` 或重启服务。
- 新增接口时，请保持 `dataType` 命名风格，并在本 README 中同步更新。
