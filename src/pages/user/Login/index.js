import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators as commonActionCreators } from '@/store/common';
import { Checkbox, Alert, Icon, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import Login from '@/components/Login';
import appPermissions from '@/config/appPermissions';
import { appWrapAuth, AppWrap } from '@/components/WrapAuth';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

class LoginPage extends Component {
  state = {
    type: appPermissions.includes('AccountLogin') ? 'account' : 'mobile',
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
          const {
            intl: { formatMessage }
          } = this.props;
          console.log(values);
          Modal.info({
            title: formatMessage({ id: 'app.login.verification-code-warning' })
          });
        }
      });
    });

  handleSubmit = (err, values) => {
    const { user_login } = this.props;
    const { type } = this.state;
    if (!err) {
      user_login({
        ...values,
        type
      });
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
    const {
      intl: { formatMessage },
      user
    } = this.props;

    if (
      !['AccountLogin', 'PhoneLogin'].some(item =>
        appPermissions.includes(item)
      )
    ) {
      message.warn('请至少选择一种登录方式');
      return null;
    }

    const isAccountLogin = appPermissions.includes('AccountLogin');
    const isPhoneLogin = appPermissions.includes('PhoneLogin');

    const CheckboxWrap = appWrapAuth(Checkbox);
    const AWrap = appWrapAuth('a');
    const LinkWrap = appWrapAuth(Link);

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
          {isAccountLogin && (
            <Tab
              key="account"
              tab={formatMessage({ id: 'app.login.tab-login-credentials' })}
            >
              {user.status === 'error' &&
                type === 'account' &&
                this.renderMessage(
                  formatMessage({ id: 'app.login.message-invalid-credentials' })
                )}
              <UserName
                name="userName"
                placeholder={`${formatMessage({
                  id: 'app.login.userName'
                })}: admin or user`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'validation.userName.required'
                    })
                  }
                ]}
              />
              <Password
                name="password"
                placeholder={`${formatMessage({
                  id: 'app.login.password'
                })}: ant.design`}
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'validation.password.required'
                    })
                  }
                ]}
                onPressEnter={e => {
                  e.preventDefault();
                  this.loginForm.validateFields(this.handleSubmit);
                }}
              />
            </Tab>
          )}
          {isPhoneLogin && (
            <Tab
              key="mobile"
              tab={formatMessage({ id: 'app.login.tab-login-mobile' })}
            >
              {user.status === 'error' &&
                user.type === 'mobile' &&
                !user.loading &&
                this.renderMessage(
                  formatMessage({
                    id: 'app.login.message-invalid-verification-code'
                  })
                )}
              <Mobile
                name="mobile"
                placeholder={formatMessage({
                  id: 'form.phone-number.placeholder'
                })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'validation.phone-number.required'
                    })
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: formatMessage({
                      id: 'validation.phone-number.wrong-format'
                    })
                  }
                ]}
              />
              <Captcha
                name="captcha"
                placeholder={formatMessage({
                  id: 'form.verification-code.placeholder'
                })}
                countDown={120}
                onGetCaptcha={this.onGetCaptcha}
                getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}
                getCaptchaSecondText={formatMessage({
                  id: 'form.captcha.second'
                })}
                rules={[
                  {
                    required: true,
                    message: formatMessage({
                      id: 'validation.verification-code.required'
                    })
                  }
                ]}
              />
            </Tab>
          )}
          <div>
            <CheckboxWrap
              auth="AutoLogin"
              checked={autoLogin}
              onChange={this.changeAutoLogin}
            >
              <FormattedMessage id="app.login.remember-me" />
            </CheckboxWrap>
            <AWrap auth="RetrievePw" style={{ float: 'right' }}>
              <FormattedMessage id="app.login.forgot-password" />
            </AWrap>
          </div>
          <Submit loading={user.loading}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <AppWrap auth="OtherFnLogin" className={styles.other}>
            <FormattedMessage id="app.login.sign-in-with" />
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
            <LinkWrap
              auth="Register"
              className={styles.register}
              to="/user/register"
            >
              <FormattedMessage id="app.login.signup" />
            </LinkWrap>
          </AppWrap>
        </Login>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.common.user
});

const mapDispatchToProps = {
  user_login: commonActionCreators.user_login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginPage));
