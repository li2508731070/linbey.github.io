# 个人网络资料库 + 命令速查中心

这是一个部署在 GitHub Pages 上的静态站点，用于管理个人网络资料、命令速查和排障记录。

## 当前定位

- 个人网络资料库：PDF、Markdown、配置文档、实验资料、课程资料、截图索引。
- Command Center：本地 `data/commands.json` 命令速查，不接后端。
- Troubleshooting Notes：本地 `data/troubleshooting.json` 排障记录沉淀。
- Inbox / Temporary Notes：浏览器本地 IndexedDB 暂存待整理文件。

## 数据文件

- `docs/documents.json`：资料库索引。
- `data/commands.json`：命令速查数据。
- `data/troubleshooting.json`：排障记录数据。
- `docs/`：PDF、Markdown、配置文件等静态资料。

## 静态站限制

GitHub Pages 不能保存云端上传文件。本项目不实现后端、登录、数据库、云端上传或 AI API 调用，也不暴露任何 API Key。

临时暂存区只保存到当前浏览器 IndexedDB。需要正式归档时，手动把文件放入 `docs/`，再更新 `docs/documents.json`。

## 部署到 GitHub Pages

1. 把本目录内容提交到 GitHub Pages 仓库。
2. 在仓库 Settings -> Pages 中选择部署分支。
3. 自定义域名继续使用仓库中的 `CNAME`。
