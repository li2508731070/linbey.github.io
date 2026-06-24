# 个人知识库

这是一个可直接部署到 GitHub Pages 的个人知识库前端原型。

## 当前功能

- 文档资料浏览、搜索、类型筛选和排序
- 文档详情与下载
- 浏览器本地临时上传暂存区
- 暂存文件下载、删除、清空
- 知识库索引导出
- GitHub API、对象存储、访问控制的接口预留

## 部署到 GitHub Pages

1. 把本目录内容提交到你的 GitHub 仓库。
2. 在仓库 Settings -> Pages 中选择部署分支。
3. 如果使用自定义域名，在 Pages 里配置 Custom domain。
4. 如需使用根域名，按 GitHub 提示配置 DNS 的 A 记录；如需使用子域名，配置 CNAME。

## 上传能力说明

GitHub Pages 不能单独保存用户上传文件。当前上传区使用浏览器 IndexedDB 做本地暂存，刷新后仍在当前浏览器内保留。

真正上线时建议二选一：

- 小型文档：接 GitHub API，把上传文件提交到仓库 `uploads/` 或 `pending/`。
- 大文件/私密资料：接 Cloudflare R2、Supabase Storage 或 S3，网站只保存索引。

相关前端位置在 `app.js`：

- `saveFiles(files)`：当前本地暂存入口，可替换为后端上传调用。
- `docs`：当前静态索引，可替换为远程 JSON 或数据库查询。
