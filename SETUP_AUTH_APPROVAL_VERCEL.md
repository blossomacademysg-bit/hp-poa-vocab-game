# Vercel 上线 + Firebase 注册/审批（傻瓜清单）

> 管理员邮箱：**blossomacademy.sg@gmail.com**
> 
> 目标：
> 学生注册 → 收到“邮箱验证”邮件 → 完成验证 → 你收到“新申请提醒邮件” → 你点进去审批通过 → 学生才能登录。

---

## 第 0 步：准备（你只需要一个 Google 账号）
- Firebase Console 登录用 Google 账号
- Vercel 也建议用同一个 Google 账号登录（方便）

---

## 第 1 步：先把网站临时上线到 Vercel（拿到网址）
### 方式 A（最推荐）：GitHub + Vercel 自动部署
1. 把网站代码上传到 GitHub（一个仓库）
2. 打开 Vercel：New Project → Import Git Repository
3. Framework 选 Vite（它通常自动识别）
4. Build Command：`pnpm build`（默认）
5. Output Directory：`dist`
6. 点 Deploy
7. 部署成功后你会得到一个网址，例如：
   - `https://hp-poa-vocab-game.vercel.app`

> 以后你每次更新代码并推送到 GitHub，Vercel 会自动更新。

### 方式 B（不想用 GitHub）：Vercel CLI（略）
如果你需要，我也可以给你 CLI 版本步骤。

---

## 第 2 步：Firebase 创建项目（4 个点击就够）
1. Firebase Console → Add project → Next… → Create
2. Build → Authentication → Get started
3. Sign-in method → Email/Password → Enable
4. Build → Firestore Database → Create database → 先选 **Test mode**（先跑起来）

---

## 第 3 步：把 Firebase 配置填进代码（只改 1 个文件）
Firebase Console → Project settings（齿轮）→ Your apps → `</>`（Web）→ Register app

复制它给你的配置（apiKey / authDomain / projectId / …）

粘贴到：`src/lib/firebase.ts`

然后提交到 GitHub → Vercel 自动重新部署。

---

## 第 4 步：先跑通“注册 + 邮箱验证 + 审批后台”
### 你要测试 3 个网址
- 学生注册：`https://你的Vercel网址/#/register`
- 学生登录：`https://你的Vercel网址/#/login`
- 管理员审批：`https://你的Vercel网址/#/admin`

### 测试流程（建议你自己走一遍）
1. 用一个“非管理员邮箱”去注册（例如你的备用邮箱）
2. 这个邮箱会收到 Firebase 发来的“邮箱验证邮件” → 点验证
3. 你用管理员邮箱打开 `/#/admin` 登录
4. 在列表里看到新申请 → 点“通过”
5. 学生再去 `/#/login` 登录 → 成功进入

---

## 第 5 步：让 Blossom 邮箱自动收到“新申请提醒邮件”（你要求必须有）
你选择的是：**必须发邮件到 blossomacademy.sg@gmail.com**。

最省事方案：Firebase Extension（不用写后端代码）。

### A. 安装 Trigger Email Extension
1. Firebase Console → Extensions
2. 搜索：Trigger Email
3. Install

### B. 关键配置（你只要抓住 3 点）
- 触发：Firestore 新增记录
- 集合：`pending_users`
- 收件人：`blossomacademy.sg@gmail.com`

### C. 邮件里放“审批入口”链接
邮件正文里放：
- `https://你的Vercel网址/#/admin`

这样你收到邮件 → 点进去就是审批页面（满足“邮件里点进去审批”）。

> 说明：我们目前实现的是“邮件提醒 + 你点开后台审批”。
> 如果你坚持要“邮件里直接有通过/拒绝按钮，并且点一下就改状态”，那需要 Cloud Functions + 安全签名链接（我也能做，但会复杂一档）。

---

## 第 6 步：后续（等官网做好后）
你未来官网做好后，建议：
- 用子域名：`game.blossomeducation.sg` 指向 Vercel
- 或者官网菜单直接链接到 Vercel 网址

---

## 你现在要做的 2 件事（最短路径）
1) 把网站部署到 Vercel，拿到网址
2) 把这个网址发给我

我收到网址后，可以帮你把：
- 管理员邮件模板里的链接
- 文案里出现的“示例网址”
都替换成你的真实网址，并检查每个入口页面是否顺畅。
