# 网易云音乐移动端 React + hooks

[![CloudMusic CI/CD](https://github.com/real-jacket/cloudmusic-hooks/actions/workflows/main.yml/badge.svg)](https://github.com/real-jacket/cloudmusic-hooks/actions/workflows/main.yml)

一个基于 React 技术栈开发的网易云音乐移动端，使用技术栈为 react + hooks + redux + react-router + immutable + axios 等，借用开源的 网易云 api 开发而成。

## 开发文档

这是一个个人学习项目，项目开发参考自掘金小册 [React Hooks 与 Immutable 数据流实战](https://juejin.im/book/5da96626e51d4524ba0fd237) , 使用 react-create-app 脚手架开发而成，项目里包含大量的UI组件、以及一些高度封装的自定义 hooks 组件，使用了业内知名的第三方库来实现特殊的动画效果。

### 目录结构

```text
|── .github/workflows         github action 固定部署目录
|   ├── main.yml              部署配置文件
|── deploy_sh                 shell 部署脚本
|   ├── docker-compose.yml    docker-compose 配置文件
|   ├── start.sh              服务器项目部署脚本
├── nginx                     nginx 服务配置
├── public                    静态文件目录
├── src                       源码目录
|   ├── api                   接口管理目录
|   ├── application           页面目录（根据路由分割）
|   |   ├── Home              页面组件
|   |   |   ├── Banner        页面 Home 私有组件
|   |   |   ├── store         组件 redux 状态
|   |   |   ├── index.js      Home 页面逻辑
|   |   |   └── style.js      Home 页面样式
|   ├── assets                静态文件目录（字体、icon、全局css变量相关）
|   ├── baseUI                通用UI组件
|   ├── components            公共组件目录
|   |   |── Header            全局公共组件
|   |   |   ├── index.js      Header组件
|   |   |   └── style.js      Header组件样式文件
|   ├── config                项目配置
|   ├── routes                项目路由集中配置
|   ├── utils                 公共方法库
|   ├── store                 状态管理
|   ├── App.js                App 组件文件
|   ├── index.js              项目入口文件
|   └── style.js              全局 style-componets 样式文件
├── .dockerignore             Docker 镜像构建 ignore 文件
├── Dockerfile                镜像构建配置
└── package.json
```

### 功能实现:

- [x] 首页
- [x] 歌手排行页
- [x] 榜单页
- [x] 歌单页/个人专辑页
- [x] 播放页
- [ ] 搜索页
- [ ] 个人信息侧边栏

### ci/cd 部署实现

这个项目实现了基于 github action 与 docker 容器平台的 ci/cd 自动化流程。

目前流程步骤：

1. github 代码库 push 代码 master 分支，自动触发 action。
2. 拉取 master 分支代码进行 build 打包。
3. 根据 Dockerfile 配置文件进行 镜像构建，并上传到镜像仓库，一般是个人的 Docker Hub。
4. 通过 ssh 登录个人服务器，上传执行脚本文件 deploy_sh。
5. 服务器登陆 docker 仓库。
6. 执行 shell 部署脚本，拉取最近构建的镜像，并 通过docker-compose 配置文件运行容器。

## 项目计划

这个项目未来除了会新增与完善一些页面功能外，会尽力更新以下内容：

- [ ] 项目性能优化
- [ ] typescript 重构实现
- [ ] 项目单元测试 cypress/jest
- [ ] 原生移动端 flutter 版本实现


