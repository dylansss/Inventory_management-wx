# front-wx 项目修改说明

## 修改内容

### 1. 底部菜单修改
- 将原有的【首页、消息、我的】三个菜单改为【库存、视图】两个菜单
- 修改文件：
  - `app.json` - 更新tabBar配置
  - `custom-tab-bar/index.js` - 更新菜单列表
  - `custom-tab-bar/index.wxml` - 更新菜单UI

### 2. 登录页面改造
- 简化登录页面，只保留用户名和密码登录
- 增加微信号绑定逻辑：
  - 登录成功后自动获取微信授权
  - 调用 `/auth/bind-wechat` 接口绑定微信号
  - 即使绑定失败也允许用户正常使用系统
- 增加登录鉴权：进入应用时检查token，未登录跳转到登录页
- 修改文件：
  - `pages/login/login.js` - 登录逻辑
  - `pages/login/login.wxml` - 登录UI
  - `pages/login/login.less` - 登录样式
  - `pages/login/login.json` - 组件配置

### 3. 库存页面
- 顶部搜索框：支持按商品名称搜索
- 列表展示：显示商品名称和库存数量
- 右下角悬浮按钮：点击进入入库出库页面
- 支持下拉刷新
- 新增文件：
  - `pages/stock/index.js`
  - `pages/stock/index.wxml`
  - `pages/stock/index.less`
  - `pages/stock/index.json`

### 4. 入库出库页面
- 选择操作类型：入库/出库
- 选择商品：从商品列表中选择
- 输入数量：使用步进器组件
- 填写备注：可选
- 提交后返回库存页面并刷新
- 新增文件：
  - `pages/stock-operation/index.js`
  - `pages/stock-operation/index.wxml`
  - `pages/stock-operation/index.less`
  - `pages/stock-operation/index.json`

### 5. 视图页面
- 查询所有库存数据（分页设置为999）
- 使用横向柱状图展示库存数据
- 支持下拉刷新
- 新增文件：
  - `pages/chart/index.js`
  - `pages/chart/index.wxml`
  - `pages/chart/index.less`
  - `pages/chart/index.json`

### 6. 配置修改
- 服务地址改为：`https://129.211.5.21`
- 关闭Mock模式
- 修改文件：`config.js`

### 7. 请求工具优化
- 修复状态码判断（从 `res.code` 改为 `res.statusCode`）
- 增加401未授权处理，自动跳转登录页
- 修改文件：`api/request.js`

### 8. 应用入口优化
- 移除Mock相关代码
- 移除WebSocket相关代码
- 移除事件总线相关代码
- 修改文件：`app.js`

## 接口说明

### 使用的后端接口
- `POST /auth/login` - 用户登录
- `POST /auth/bind-wechat` - 绑定微信号
- `GET /stock` - 获取库存列表（支持分页和搜索）
- `POST /stock/in` - 入库操作
- `POST /stock/out` - 出库操作

## 注意事项
1. 所有页面都会在进入时检查登录状态
2. 请求失败时会显示错误提示
3. 微信授权失败不影响正常使用
4. 服务器地址已配置为生产环境
