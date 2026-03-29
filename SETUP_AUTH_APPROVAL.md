# 设置注册登录 + 管理员审批（Firebase）

> 目标：学生用邮箱注册 → 先完成邮箱验证 → 系统给 Blossom 邮箱发提醒 → 管理员通过后才可登录使用。

## 1) 创建 Firebase 项目
1. Firebase Console 新建项目
2. Build → Authentication → 启用 **Email/Password**
3. Authentication → Settings → Email templates → 启用 **Email verification**（默认就有）
4. Build → Firestore Database → 创建数据库（Production/测试均可）

## 2) 配置 Firestore 规则（最重要）
你需要让：
- 任何登录用户只能读自己那条 `pending_users/{uid}`
- 只有管理员邮箱（或自定义 claim）能读写全部并审批

推荐做法：用 **Firebase Custom Claims** 标记管理员（最安全）。
如果你暂时不想做 Claims，可先用“只读管理员页面 + 控制台审批”方式跑起来。

## 3) 填写前端 Firebase 配置
编辑：`src/lib/firebase.ts`
把 `firebaseConfig` 替换为你项目的 Web App 配置。

## 4) 审批邮件怎么发给 blossomacademy.sg@gmail.com
前端本身无法安全地直接发邮件（会暴露密钥）。
推荐 2 个方式：

### A. Firebase Extension：Trigger Email（推荐）
- 安装 Firebase Extension：**Trigger Email**
- 配置触发条件：当 `pending_users/{uid}` 新增时发送
- 收件人固定：`blossomacademy.sg@gmail.com`
- 邮件内容放链接：`https://你的域名/#/admin`
  - 管理员点进去登录后，在后台列表点“通过/拒绝”。

### B. Cloud Functions + SendGrid/Mailgun
- 写一个 Firestore onCreate 触发器（监听 `pending_users`）
- 用 SendGrid/Mailgun 发送邮件
- 邮件里同样放管理员链接 `/#/admin`

> 你刚才选择“必须发邮件 + 邮件里有审批入口”，A 或 B 都能满足。

## 5) 使用流程
- 学生注册：`/#/register`
- 学生完成邮箱验证
- 管理员收到邮件 → 点开 `/#/admin`
- 管理员登录（blossomacademy.sg@gmail.com）→ 通过/拒绝
- 学生登录：`/#/login`

