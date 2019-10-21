import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Alert, Icon, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
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
    const {
      intl: { formatMessage },
      user
    } = this.props;

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
                  message: formatMessage({ id: 'validation.userName.required' })
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
                  message: formatMessage({ id: 'validation.password.required' })
                }
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
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
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div>
          <Submit loading={user.loading}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <div className={styles.other}>
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
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.common.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LoginPage));
