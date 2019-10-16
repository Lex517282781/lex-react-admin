import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './style.less';

const { Header } = Layout;

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
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  handleNoticeClear = () => {
    message.success(`清空了 站内搜索`);
    console.log(`dispatch({
      type: 'global/clearNotices',
      payload: type
    });`);
  };

  handleMenuClick = ({ key }) => {
    if (key === 'userCenter') {
      console.log('个人中心');
      return;
    }
    if (key === 'triggerError') {
      console.log('错误页面');
      return;
    }
    if (key === 'userinfo') {
      console.log('个人信息');
      return;
    }
    if (key === 'logout') {
      console.log('退出');
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
    const { layout, fixedHeader } = setting; // navTheme,
    const { visible } = this.state;
    const isTop = layout === 'topmenu';
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header
        style={{ padding: 0, width }}
        className={fixedHeader ? styles.fixedHeader : ''}
      >
        {isTop && !isMobile ? (
          <GlobalHeader
            onCollapse={handleMenuCollapse}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
            {...this.props}
          />
        ) : (
          // <TopNavHeader
          //   theme={navTheme}
          //   mode="horizontal"
          //   onCollapse={handleMenuCollapse}
          //   onNoticeClear={this.handleNoticeClear}
          //   onMenuClick={this.handleMenuClick}
          //   onNoticeVisibleChange={this.handleNoticeVisibleChange}
          //   {...this.props}
          // />
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderView);
