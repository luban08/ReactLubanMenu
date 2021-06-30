import React from 'react';
import PropTypes from 'prop-types';
import Mask from './mask';
import Panel from './panel';

export default class LubanMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false, // 展开菜单
      expandRight: false, // 展开右侧全部应用
    }
  }

  handleTriggerClick(e) {
    this.setState({
      open: true
    })
  }

  hideMenu(e) {
    this.setState({
      open: false,
      expandRight: false
    })
  }

  showRight() {
    this.setState({
      expandRight: true
    })
  }

  render() {
    const { open, expandRight } = this.state;
    const { zIndex, children } = this.props;
    const trigger = React.cloneElement(children, {
      onClick: () => {this.handleTriggerClick()}
    })
    return (
      <>
        {trigger}
        <Mask zIndex={zIndex} open={open} hideMenu={() => this.hideMenu()}/>
        <Panel {...this.props} open={open} expandRight={expandRight} showRight={()=>this.showRight()} hideMenu={() => this.hideMenu()}/>
      </>
    )
  }
}

LubanMenu.propTypes = {
  zIndex: PropTypes.number,
  offsetTop: PropTypes.number,
  useDefaultAction: PropTypes.bool,
  favorites: PropTypes.array,
  apps: PropTypes.array,
  children: PropTypes.element.isRequired,
  onMenuClick: PropTypes.func,
  onFavoriteRemove: PropTypes.func,
  onFavoriteAdd: PropTypes.func
};