import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import defaultSettings from '@/config/defaultSettings';
import { getPageQuery } from '@/utils/tools';
import { stringify } from 'qs';
import store from 'store';
import styles from './style.less';

const { Header } = Layout;

const { siderWidth } = defaultSettings;

class HeaderView extends Component {
  state = {
    visible: true
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, setting } = this.props;
    const { fixedHeader, layout } = setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : `calc(100% - ${siderWidth}px)`;
  };

  handleNoticeClear = type => {
    const {
      intl: { formatMessage }
    } = this.props;
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage(
        {
          id: `component.globalHeader.${type}`
        }
      )}`
    );
    console.log(`dispatch({
      type: 'global/clearNotices',
      payload: type
    });`);
  };

  handleMenuClick = ({ key }) => {
    const { history } = this.props;
    if (key === 'userCenter') {
      history.push('/account/center');
      return;
    }
    if (key === 'triggerError') {
      history.push('/exception/trigger');
      return;
    }
    if (key === 'userinfo') {
      history.push('/account/settings');
      return;
    }
    if (key === 'logout') {
      this.logout();
    }
  };

  logout = () => {
    // const { history } = this.props;
    const { redirect } = getPageQuery();
    if (!redirect) {
      store.clearAll();
      window.location.href = `/user/login?${stringify({
        redirect: window.location.href
      })}`;
      // history.replace(
      //   `/user/login?${stringify({
      //     redirect: window.location.href
      //   })}`
      // );
    }
  };

  handleNoticeVisibleChange = visible => {
    if (visible) {
      console.log(`dispatch({
        type: 'global/fetchNotices'
      });`);
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  render() {
    const { isMobile, handleMenuCollapse, setting } = this.props;
    const { layout, navTheme, fixedHeader } = setting;
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header
        style={{ padding: 0, width }}
        className={fixedHeader ? styles.fixedHeader : ''}
      >
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : (
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        )}
      </Header>
    ) : null;
    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.common.user.currentUser,
  collapsed: state.common.global.collapsed,
  notices: state.common.global.notices,
  setting: state.common.setting
});

// const mapDispatchToProps = dispatch => dispatch;

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(injectIntl(HeaderView));
