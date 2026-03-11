---
name: start-frontend
description: >
  启动华夏基金大屏前端开发服务器（uibot-commander Vue CLI 项目）。
  当用户说"启动前端"、"启动前端服务"、"运行前端"、"start frontend"、
  "start dev server"、"npm run serve"、"开启大屏前端"、"跑一下前端"
  等表达意图时，必须调用此 Skill。即使用户只是问"前端怎么启动"，
  也应主动提供本 Skill 的完整流程。
---

# 华夏基金大屏前端启动指南

## 项目信息

| 属性 | 值 |
|------|-----|
| 框架 | Vue CLI（Vue 2 + Webpack） |
| 启动命令 | `npm run serve` |
| 开发端口 | **8010** |
| 代理后端 | `http://localhost:5000/` |
| 访问地址 | http://localhost:8010 |

**项目根目录**（Windows 路径）：
```
e:\来也科技\华夏基金\交付文档整理-大屏\源码\uibot-commander-v5-view-huaxia_cockpitscreen-master(后端)\uibot-commander-v5-view-huaxia_cockpitscreen-master
```

---

## 启动流程

### 第一步：检查端口是否已占用

在执行启动命令之前，先检查 8010 端口是否已有进程在运行，避免重复启动：

```bash
# Windows 环境检查端口占用
netstat -ano | findstr ":8010"
```

- 若有输出，说明服务已在运行，直接告知用户访问 http://localhost:8010 即可。
- 若无输出，继续执行第二步。

### 第二步：在后台启动服务

使用 `run_in_background: true` 在后台运行，避免阻塞对话：

```bash
cd "e:\来也科技\华夏基金\交付文档整理-大屏\源码\uibot-commander-v5-view-huaxia_cockpitscreen-master(后端)\uibot-commander-v5-view-huaxia_cockpitscreen-master" && npm run serve
```

> 重要：首次启动 Webpack 编译时间较长（通常 60~180 秒），项目模块数量多，请耐心等待。

### 第三步：等待并确认启动成功

编译完成后，终端输出会包含类似内容：

```
 DONE  Compiled successfully in xxxms

  App running at:
  - Local:   http://localhost:8010/
  - Network: http://192.168.x.x:8010/
```

出现 `Compiled successfully` 即为启动成功。

### 第四步：向用户报告结果

启动成功后，清晰告知用户：

- **本地访问**：http://localhost:8010
- **网络访问**：http://[本机IP]:8010（局域网其他设备可用）
- **注意事项**：前端代理到 `http://localhost:5000/`，请确保后端服务已同步启动

---

## 常见问题处理

### 端口 8010 被占用

```bash
# 查找占用 8010 端口的进程 PID
netstat -ano | findstr ":8010"

# 结束该进程（替换 <PID> 为实际进程号）
taskkill /PID <PID> /F
```

然后重新执行启动命令。

### npm 命令不存在

检查 Node.js 是否安装：`node -v`，若未安装请先安装 Node.js（建议 14.x 或 16.x）。

### 依赖缺失（node_modules 不存在）

```bash
cd <项目根目录>
npm install
```

安装完成后再运行 `npm run serve`。

### 编译报错

编译出现 ERROR 时，将错误信息告知用户，常见原因：
- 代码语法错误（需修复源码）
- 缺少依赖（运行 `npm install` 补装）
