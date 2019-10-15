import React, { Component } from 'react';
// import { Layout, message } from 'antd';
// import Animate from 'rc-animate';

class HeaderView extends Component {
  state = {
    visible: true
  };

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
    // const { visible } = this.state;
    return <div>HeaderView</div>;
  }
}

export default HeaderView;
