import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

export default class Mask extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { zIndex, open } = this.props;
    const mask = (
      <div
        className={styles['luban-nav-mask']} 
        style={{ zIndex: zIndex - 1, display: open ? 'block' : 'none' }}
        onClick={this.props.hideMenu}
      ></div>
    )
    return ReactDOM.createPortal(mask, document.body);
  }
}