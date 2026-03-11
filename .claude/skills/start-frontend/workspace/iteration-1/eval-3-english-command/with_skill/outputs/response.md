# 测试用例 3 - 有 Skill 响应
**提示词**：start the frontend dev server

---

Sure! Let me start the frontend dev server for you.

## Step 1: Check if port 8010 is already in use

```bash
netstat -ano | findstr ":8010"
```

No output — port 8010 is free. Proceeding to start the server.

---

## Step 2: Start the development server in background

```bash
cd "e:\来也科技\华夏基金\交付文档整理-大屏\源码\uibot-commander-v5-view-huaxia_cockpitscreen-master(后端)\uibot-commander-v5-view-huaxia_cockpitscreen-master" && npm run serve
```

> **Heads up**: This is a large Vue CLI + Webpack project. First-time compilation typically takes **60–180 seconds**. Please wait patiently.

---

## Step 3: Ready!

Once you see `Compiled successfully` in the terminal, the server is up.

**Access URLs:**
- Local: http://localhost:8010
- Network: http://[your-IP]:8010

**Note**: The frontend proxies all API requests to `http://localhost:5000/`. Make sure the backend service is also running, otherwise API calls will fail.
