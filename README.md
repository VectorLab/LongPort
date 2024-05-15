# LongPort

## 概述
本项目由矢量实验室编写、测试，以供HW & YZ（匯萬盈兆）使用。请各位实验委员注意区分测试token和真实token

## 设置
使用yarn安装node_modules
```bash
yarn install
```

新建一个 `.env` 并将HW & YZ（匯萬盈兆）提供的信息填入

```dotenv
LONGPORT_APP_KEY=""
LONGPORT_APP_SECRET=""
LONGPORT_ACCESS_TOKEN=""
```

## 测试

使用yarn启动
```bash
yarn run dev
```

应用程序将运行在 `http://localhost:3000`

## 注意事项

根据 [LongPort OpenAPI](https://open.longportapp.com/docs) 的文档，接口有限制：

- 所有的接口都是有最小间隔限制的，所以理论上同一个接口都是不支持并发调用。

- 30 秒内不超过 30 次调用，且每两次调用之间间隔不小于 0.02 秒

因此可能还需要写一个MongoDB存储一些查询的值