# 测试用例 1 - 有 Skill 响应
**提示词**：启动前端服务

---

好的，我来帮你启动前端服务。

## 第一步：检查 8010 端口是否已在运行

```bash
netstat -ano | findstr ":8010"
```

**检查结果**：端口 8010 当前未被占用（或已被占用需告知用户）。

---

## 第二步：在后台启动服务

正在以后台模式启动 uibot-commander 前端开发服务器：

```bash
cd "e:\来也科技\华夏基金\交付文档整理-大屏\源码\uibot-commander-v5-view-huaxia_cockpitscreen-master(后端)\uibot-commander-v5-view-huaxia_cockpitscreen-master" && npm run serve
```

> **注意**：这是 Vue CLI + Webpack 项目，首次编译通常需要 **60~180 秒**，项目模块较多，请耐心等待。

---

## 第三步：启动成功标志

当终端输出如下内容时，说明编译成功：

```
 DONE  Compiled successfully in xxxms

  App running at:
  - Local:   http://localhost:8010/
  - Network: http://192.168.x.x:8010/
```

---

## 访问地址

| 访问方式 | 地址 |
|---------|------|
| 本地访问 | http://localhost:8010 |
| 局域网访问 | http://[本机IP]:8010 |

**注意**：前端已配置代理到 `http://localhost:5000/`，请确保后端服务也已同步启动，否则接口请求会失败。
