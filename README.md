# react-luban-menu

> react版本的鲁班导航菜单组件


## 安装

```bash
npm install react-luban-menu --save
```

### 引入

```js
import LubanMenu from 'react-luban-menu'
```

### 使用

```html
  <LubanMenu 
    zIndex={1000} 
    offsetTop={54} 
    useDefaultAction={true} 
    favorites={favorites} 
    apps={apps}
    onMenuClick={() => {}}
    onFavoriteRemove={() => {}}
    onFavoriteAdd={() => {}}
  >
    <div>click me</div>
  </LubanMenu>
```

### Props

| 名称 | 介绍 | 类型 | 备注 |
|-----------|-----------|-----------|-------------|
| apps | 应用数据列表，树形结构，直接使用原始接口数据 | `Array` | 必填 |
| favorites | 收藏列表，默认为空数组 | `Array` | 可选 |
| zIndex | 菜单的z-index，默认2000 | `Number` | 可选 |
| offsetTop | 菜单顶部位置，默认54 | `Number` | 可选 |
| useDefaultAction | 是否允许收藏添加或移除的默认行为 | `Boolean` | 可选 |


### Events

| 名称 | 介绍 | 回调参数 |
|-----------|-----------|-----------|
| onFavoriteRemove | 删除收藏时触发，可以在外部维护favorites | 应用项item |
| onFavoriteAdd | 添加收藏时触发，可以在外部维护favorites | 应用项item |
| onMenuClick | 点击菜单项触发 | 应用项item |


### apps 应用数据列表demo

```html
[
	{
		id: 1,
		title: '应用开发',
		appInstances: [
			{ id:11, title: '数据质量开发' },
			{ id:12, title: '数据服务开发' },
			{ id:13, title: 'steamSQL' },
			{ id:14, title: '工作流开发' }
		]
	}
]
```

### favorites demo

```html
[
	{
		id: 1,
		menuApplicationId: 11,
		title: '数据服务开发'
	}
]
```
