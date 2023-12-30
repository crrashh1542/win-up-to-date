# category 版本列表
该目录下数据为某一指定开发代号/周期下的**向公众推送的**版本列表。

快速导航：[数据格式](#数据格式) | [类型列表](#类型列表)

## 数据格式

### 第一层数据结构
* `name`：当前阶段名称
* `category`：当前阶段代号
* `semester`：当前开发阶段
* `range`：当前代号版本范围
* `previous`：上一阶段代号
* `next`：下一阶段代号

### 第二层 `previous`/`next` 数据结构
* `path`：导航的路由路径，与 JSON 文件名称一致
* `name`：显示在导航栏的文字

### 第二层 `range` 数据结构
* 第0项：起始版本
* 第1项：终止版本

### 第二层 `list` 数据结构
* 第0项：版本/构建号
* 第1项：发布日期
* 第2项：详情页的 router 路径，由 `根目录/detail/` 后拼接


## 类型列表
本列表以各个开发代号/周期的构建号高低来排列。

**Windows 10**
| 序号 |   显示名称       |   开发周期   |
|------|-----------------|-------------|
| 101  | Threshold 1     | 1507 (LTSB) |
| 102  | Threshold 2     | 1511        |
| 103  | Redstone 1      | 1607 (LTSB) |
| 104  | Redstone 2      | 1703        |
| 105  | Redstone 3      | 1709        |
| 106  | Redstone 4      | 1803        |
| 107  | Redstone 5      | 1809 (LTSC) |
| 108  | Titanium        | 1903        |
| 109  | Vanadium        | 1909        |
| 110  | Vibranium       | 2004        |
| 111  | Vibranium       | 20H2        |
| 112  | Vibranium       | 21H1        |
| 113  | Vibranium       | 21H2 (LTSC) |
| 114  | Vibranium       | 22H2        |
| 115  | Manganese       | 20H2        |
| 116  | Iron (Client)   | 21H1        |
| 117  | Iron (Server)   | 21H2        |
| 118  | Cobalt (Wave 1) | 21H2

**Windows 11**
| 序号 |   显示名称        |   开发周期   |
|------|------------------|-------------|
| 201  | Cobalt           | 21H2        |
| 202  | Nickel           | 22H2        |
| 203  | Nickel (22 RP)   | 22H2        |
| 204  | Nickel (22 Beta) | 22H2        |
| 205  | Nickel (23 RP)   | 23H2        |
| 206  | Nickel (23 Beta) | 23H2        |
| 207  | Nickel (上游)    | 22H2 & 23H2 |
| 208  | Copper           | 23H1        |
| 209  | Zinc (Client)    | 23H2        |
| 210  | [Zinc (Server)](../category/zinc-server.json) | 23H2        |
| 211  | [Gallium](../category/gallium.json)           | 24H1        |
| 212  | [Germanium](../category/germanium.json)       | 24H2        |