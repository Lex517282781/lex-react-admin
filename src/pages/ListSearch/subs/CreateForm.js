import React, { PureComponent } from 'react';
import { Form, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import { stateSuccess } from '@/store/actionCreators';
import * as listsearchActions from '../effects';

const FormItem = Form.Item;

class CreateForm extends PureComponent {
  handleOk = () => {
    const { form, handleAdd } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };

  handleCancel = () => {
    const { createFormUpdate } = this.props;
    createFormUpdate({
      visible: false
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      createForm
    } = this.props;

    return (
      <Modal
        destroyOnClose
        title="新建规则"
        visible={createForm.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {getFieldDecorator('desc', {
            rules: [
              {
                required: true,
                message: '请输入至少五个字符的规则描述！',
                min: 5
              }
            ]
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Modal>
    );
  }
}

const mapStateToProps = rootState => ({
  createForm: rootState.listsearch.createForm
});

const mapDispatchToProps = {
  stateSuccess,
  createFormUpdate: listsearchActions.createFormUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(CreateForm));
