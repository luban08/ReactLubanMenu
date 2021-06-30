import React, { Component } from 'react';
import LubanMenu from '../src';
import styles from './index.less';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      apps: [
        {
          id: 1,
          title: '应用开发',
          appInstances: [
            { id: 2, title: '数据质量开发' },
            { id: 3, title: '数据服务开发' },
            { id: 4, title: 'steamSQL' },
            { id: 5, title: '工作流开发' },
          ]
        },
        {
          id: 2,
          title: '数据分析&可视化',
          appInstances: [
            { id: 6, title: 'Scripts' },
            { id: 7, title: 'Visualis' },
            { id: 8, title: 'Datav' },
            { id: 9, title: 'EasyIED' },
          ]
        }
      ]
    }
  }
  render() {
    const { favorites, apps } = this.state;
    return (
      <LubanMenu zIndex={1000} offsetTop={54} useDefaultAction={true} favorites={favorites} apps={apps}
        onMenuClick={(app) => {console.log('menu click', app)}}
        onFavoriteRemove={(item) => {
          console.log('outer remove', item);
          this.setState({
            favorites: this.state.favorites.filter(i => i.menuApplicationId !== item.menuApplicationId)
          })
        }}
        onFavoriteAdd={(item) => {
          console.log('outer add', item)
          this.setState({
            favorites: this.state.favorites.concat(item)
          })
        }}
      >
        <div className={styles.trigger}>click</div>
      </LubanMenu>
    )
  }
}