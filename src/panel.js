import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';
import classnames from 'classnames';

export default class Panel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      favoritesOrigin: this.props.favorites, // 保留原始props的favorites以做比对
      favoriteList: this.props.favorites,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { favoritesOrigin } = prevState;
    const nextFavoriteList = nextProps.favorites;
    if ((JSON.stringify(favoritesOrigin) !== JSON.stringify(nextFavoriteList))) {
      return {
        favoritesOrigin: nextFavoriteList,
        favoriteList: nextFavoriteList
      }
    }
    return null;
  }

  setFavorite(app) {
    // favorites的menuApplicationId对应app的id
    const fav = {...app, menuApplicationId: app.id}
    if (this.isFavorited(fav)) {
      this.removeFavorite(fav);
    } else {
      if (this.props.useDefaultAction) {
        this.setState({
          favoriteList: this.state.favoriteList.concat(fav)
        })
      }
      this.props.onFavoriteAdd(fav);
    }
  }

  removeFavorite(fav) {
    if (this.props.useDefaultAction) {
      this.setState({
        favoriteList: this.state.favoriteList.filter(i => i.menuApplicationId !== fav.menuApplicationId)
      })
    }
    this.props.onFavoriteRemove(fav);
  }

  isFavorited(app) {
    return this.state.favoriteList.find(i => i.menuApplicationId === app.id)
  }

  handleMenuClick(app) {
    this.props.hideMenu();
    this.props.onMenuClick(app)
  }
  
  render() {
    const { favoriteList } = this.state;
    const { zIndex, offsetTop, apps, open, expandRight } = this.props;
    const panel = (
      <div className={classnames(styles["luban-nav-panel"], open ? styles["nav-open"] : '')} style={{zIndex, marginTop: offsetTop + 'px'}}>
        <div className={styles["nav-left"]} style={{zIndex: zIndex + 1}}>
          <div className={classnames(styles["nav-all"], expandRight ? styles["active"] : '' )} onMouseEnter={()=>this.props.showRight()}>
            <i></i>
            全部产品
          </div>
          <ul className={styles["nav-collect"]}>
            {
              favoriteList.map(fav => {
                return (
                  <li className={styles["nav-item"]} key={'fav-' + (fav.menuApplicationId || fav.title)}>
                    <span className={styles["nav-item-title"]} onClick={()=>this.handleMenuClick(fav)}>{fav.title}</span>
                    <span className={styles["nav-item-close"]} onClick={()=>this.removeFavorite(fav)}></span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={classnames(styles["nav-right"], expandRight ? styles["nav-right-open"] : '' )} style={{ zIndex: zIndex }}>
          {
            apps.map(app => {
              return (
                <div className={styles["pro-box"]} key={'nav-' + (app.id || app.title)}>
                <div className={styles["pro-category"]}>{app.title}</div>
                <div className={styles["pro-list"]}>
                  {
                    app.appInstances.map(item => {
                      return (
                        <div className={styles["pro-item"]} key={'app-' + (item.id || item.title)}>
                          <div className={styles["pro-item-inner"]}>
                            <span className={styles["pro-item-txt"]} onClick={()=>this.handleMenuClick(item)}>{item.title}</span>
                            <span className={classnames(styles["pro-item-star"], this.isFavorited(item) ? styles["favorited"] : '' )} onClick={()=>this.setFavorite(item)}></span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              )
            })
          }
        </div>
      </div>
    )
    return ReactDOM.createPortal(panel, document.body);
  }
}