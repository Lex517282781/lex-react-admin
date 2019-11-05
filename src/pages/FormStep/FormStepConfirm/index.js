import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { digitUppercase } from '@/utils/tools';
import styles from '../step.less';

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 19
  }
};

class FormStepConfirm extends React.PureComponent {
  handlePrev = () => {
    const { history } = this.props;
    history.push('/form/step/info');
  };

  handleValidateForm = () => {
    const { form, history } = this.props;
    const { validateFields } = form;
    validateFields((err, values) => {
      if (!err) {
        console.log(`dispatch({
          type: 'form/submitStepForm',
          payload: {
            ...data,
            ...${values}
          }
        });`);
        history.push('/form/step/result');
      }
    });
  };

  render() {
    const {
      formstep,
      form: { getFieldDecorator }
    } = this.props;

    if (!formstep) return null;

    const {
      formConfirm: { loading },
      formData: { data }
    } = formstep;

    return (
      <Form layout="horizontal" className={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          style={{ marginBottom: 24 }}
        />
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="付款账户"
        >
          {data.payAccount}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="收款账户"
        >
          {data.receiverAccount}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="收款人姓名"
        >
          {data.receiverName}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          className={styles.stepFormText}
          label="转账金额"
        >
          <span className={styles.money}>{data.amount}</span>
          <span className={styles.uppercase}>
            （{digitUppercase(data.amount)}）
          </span>
        </Form.Item>
        <Divider style={{ margin: '24px 0' }} />
        <Form.Item {...formItemLayout} label="支付密码" required={false}>
          {getFieldDecorator('password', {
            initialValue: '123456',
            rules: [
              {
                required: true,
                message: '需要支付密码才能进行支付'
              }
            ]
          })(
            <Input
              type="password"
              autoComplete="off"
              style={{ width: '80%' }}
            />
          )}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 8 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span
            }
          }}
          label=""
        >
          <Button
            type="primary"
            onClick={this.handleValidateForm}
            loading={loading}
          >
            提交
          </Button>
          <Button onClick={this.handlePrev} style={{ marginLeft: 8 }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = rootState => ({
  formstep: rootState.formstep
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(FormStepConfirm));
