import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import RightContent from '../GlobalHeader/subs/RightContent';
import BaseMenu from '../SiderMenu/subs/BaseMenu';
import { getFlatMenuKeys } from '../SiderMenu/tools';
import styles from './style.less';

class TopNavHeader extends PureComponent {
  state = {
    maxWidth: undefined
  };

  static getDerivedStateFromProps(props) {
    return {
      maxWidth:
        (props.contentWidth === 'Fixed' && window.innerWidth > 1200
          ? 1200
          : window.innerWidth) -
        280 -
        120 -
        40
    };
  }

  render() {
    const { theme, contentWidth, menuData, logo, title } = this.props;
    const { maxWidth } = this.state;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <div
        className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}
      >
        <div
          ref={ref => {
            this.maim = ref;
          }}
          className={`${styles.main} ${
            contentWidth === 'Fixed' ? styles.wide : ''
          }`}
        >
          <div className={styles.left}>
            <div className={styles.logo} key="logo" id="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <h1>{title}</h1>
              </Link>
            </div>
            <div
              style={{
                maxWidth
              }}
            >
              <BaseMenu
                {...this.props}
                flatMenuKeys={flatMenuKeys}
                className={styles.menu}
              />
            </div>
          </div>
          <RightContent {...this.props} />
        </div>
      </div>
    );
  }
}

export default TopNavHeader;
