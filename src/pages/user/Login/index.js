import React, { Component } from 'react';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          console.log(values);
        }
      });
    });

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      console.log({
        ...values,
        type
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked
    });
  };

  renderMessage = content => (
    <Alert
      style={{ marginBottom: 24 }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { type, autoLogin } = this.state;

    const user = {
      status: 'ok'
    };

    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="账户密码登录">
            {user.status === 'error' &&
              type === 'account' &&
              this.renderMessage('用户名或者密码错误')}
            <UserName name="userName" placeholder="请输入用户名" />
            <Password
              name="password"
              placeholder="请输入密码"
              onPressEnter={() =>
                this.loginForm.validateFields(this.handleSubmit)
              }
            />
          </Tab>
          <Tab key="mobile" tab="手机号登录">
            {user.status === 'error' &&
              type === 'mobile' &&
              this.renderMessage('用户名或者密码错误')}
            <Mobile name="mobile" placeholder="手机号" />
            <Captcha
              name="captcha"
              placeholder="验证码"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="获取验证码"
              getCaptchaSecondText="获取验证码1"
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              记住我
            </Checkbox>
            <span style={{ float: 'right' }}>忘记密码</span>
          </div>
          <Submit>登录</Submit>
          <div className={styles.other}>
            其他登录方式
            <Icon
              type="alipay-circle"
              className={styles.icon}
              theme="outlined"
            />
            <Icon
              type="taobao-circle"
              className={styles.icon}
              theme="outlined"
            />
            <Icon
              type="weibo-circle"
              className={styles.icon}
              theme="outlined"
            />
            <span className={styles.register}>注册账户</span>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
