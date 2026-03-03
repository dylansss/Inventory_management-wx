# front-wx 项目清理总结

## 清理时间
2026年3月2日

## 清理内容

### 1. 删除的页面目录
- `pages/home/` - 首页（已不使用）
- `pages/message/` - 消息页面（已不使用）
- `pages/my/` - 我的页面（已不使用）
- `pages/chat/` - 聊天页面（已不使用）
- `pages/search/` - 搜索页面（已不使用）
- `pages/setting/` - 设置页面（已不使用）
- `pages/release/` - 发布页面（已不使用）
- `pages/dataCenter/` - 数据中心页面（已不使用）
- `pages/loginCode/` - 验证码登录页面（已不使用）

### 2. 删除的组件目录
- `components/card/` - 卡片组件（已不使用）
- `components/nav/` - 导航组件（已不使用）

### 3. 删除的工具文件
- `utils/eventBus.js` - 事件总线（已不使用）
- `utils/util.js` - 工具函数（已不使用）
- `behaviors/useToast.js` - Toast行为（已不使用）

### 4. 删除的Mock数据
- `mock/` 整个目录及其所有子目录和文件
  - `mock/chat.js`
  - `mock/index.js`
  - `mock/mock.js`
  - `mock/request.js`
  - `mock/WxMock.js`
  - `mock/dataCenter/` 所有文件
  - `mock/home/` 所有文件
  - `mock/login/` 所有文件
  - `mock/my/` 所有文件
  - `mock/search/` 所有文件

### 5. 删除的静态资源
- `static/` 目录下所有图片资源
  - `static/home/` 所有图片
  - `static/chat/` 所有图片
  - 其他所有icon和背景图片

### 6. 保留的核心文件

#### 页面文件
- `pages/stock/` - 库存管理页面
- `pages/chart/` - 库存视图页面
- `pages/login/` - 登录页面
- `pages/stock-operation/` - 入库出库操作页面

#### 配置文件
- `app.js` - 应用入口（已优化）
- `app.json` - 应用配置（已更新）
- `config.js` - 配置文件（已更新服务地址）
- `custom-tab-bar/` - 自定义底部导航栏

#### 工具文件
- `api/request.js` - 请求工具（已优化）

## 清理效果

### 文件数量减少
- 删除了约100+个未使用的文件
- 删除了所有Mock数据文件
- 删除了所有未使用的静态资源

### 项目结构优化
- 只保留了4个核心页面
- 移除了所有冗余代码
- 项目结构更加清晰简洁

### 配置文件更新
- `app.json` 中移除了所有未使用页面的配置
- 只保留了必要的subpackages配置

## 当前项目结构

```
front-wx/
├── api/
│   └── request.js          # 请求工具
├── custom-tab-bar/         # 自定义底部导航
├── pages/
│   ├── stock/             # 库存页面
│   ├── chart/             # 视图页面
│   ├── login/             # 登录页面
│   └── stock-operation/   # 入库出库页面
├── app.js                 # 应用入口
├── app.json              # 应用配置
└── config.js             # 配置文件
```

## 注意事项

1. 空目录保留：部分空目录（如pages/chat、pages/home等）仍然存在，但内部文件已全部删除
2. 这些空目录不会影响项目运行，可以手动删除
3. 所有删除的文件都是未被使用的代码和资源
4. 项目功能完整，不影响正常使用
