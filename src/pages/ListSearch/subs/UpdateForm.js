import React, { PureComponent } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Modal,
  Steps,
  Radio
} from 'antd';
import { connect } from 'react-redux';
import * as listsearchActions from '../effects';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    values: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month'
      },
      currentStep: 0
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 }
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="target" {...this.formLayout} label="监控对象">
          {form.getFieldDecorator('target', {
            initialValue: formVals.target
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">表一</Option>
              <Option value="1">表二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="template" {...this.formLayout} label="规则模板">
          {form.getFieldDecorator('template', {
            initialValue: formVals.template
          })(
            <Select style={{ width: '100%' }}>
              <Option value="0">规则模板一</Option>
              <Option value="1">规则模板二</Option>
            </Select>
          )}
        </FormItem>,
        <FormItem key="type" {...this.formLayout} label="规则类型">
          {form.getFieldDecorator('type', {
            initialValue: formVals.type
          })(
            <RadioGroup>
              <Radio value="0">强</Radio>
              <Radio value="1">弱</Radio>
            </RadioGroup>
          )}
        </FormItem>
      ];
    }
    if (currentStep === 2) {
      return [
        <FormItem key="time" {...this.formLayout} label="开始时间">
          {form.getFieldDecorator('time', {
            rules: [{ required: true, message: '请选择开始时间！' }]
          })(
            <DatePicker
              style={{ width: '100%' }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="选择开始时间"
            />
          )}
        </FormItem>,
        <FormItem key="frequency" {...this.formLayout} label="调度周期">
          {form.getFieldDecorator('frequency', {
            initialValue: formVals.frequency
          })(
            <Select style={{ width: '100%' }}>
              <Option value="month">月</Option>
              <Option value="week">周</Option>
            </Select>
          )}
        </FormItem>
      ];
    }
    return [
      <FormItem key="name" {...this.formLayout} label="规则名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入规则名称！' }],
          initialValue: formVals.name
        })(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="desc" {...this.formLayout} label="规则描述">
        {form.getFieldDecorator('desc', {
          rules: [
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
              min: 5
            }
          ],
          initialValue: formVals.desc
        })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
      </FormItem>
    ];
  };

  renderFooter = currentStep => {
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={this.handleCancel}>
          取消
        </Button>,
        <Button
          key="forward"
          type="primary"
          onClick={() => this.handleNext(currentStep)}
        >
          下一步
        </Button>
      ];
    }
    if (currentStep === 2) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          上一步
        </Button>,
        <Button key="cancel" onClick={this.handleCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={() => this.handleNext(currentStep)}
        >
          完成
        </Button>
      ];
    }
    return [
      <Button key="cancel" onClick={this.handleCancel}>
        取消
      </Button>,
      <Button
        key="forward"
        type="primary"
        onClick={() => this.handleNext(currentStep)}
      >
        下一步
      </Button>
    ];
  };

  handleCancel = () => {
    const { updateFormUpdate } = this.props;
    updateFormUpdate({
      visible: false
    });
  };

  handleAfterClose = () => {};

  render() {
    const { updateForm } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="规则配置"
        visible={updateForm.visible}
        footer={this.renderFooter(currentStep)}
        onCancel={this.handleCancel}
        afterClose={this.handleAfterClose}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

const mapStateToProps = rootState => ({
  updateForm: rootState.listsearch.updateForm
});

const mapDispatchToProps = {
  updateFormUpdate: listsearchActions.updateFormUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(UpdateForm));
