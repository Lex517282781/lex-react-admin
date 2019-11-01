import React, { PureComponent } from 'react';
import { Form, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import { stateSuccess, stateUpdate } from '@/store/actionCreators';

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

  handleCancel = () => {};

  render() {
    const { modalVisible, form } = this.props;

    return (
      <Modal
        destroyOnClose
        title="新建规则"
        visible={modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
          {form.getFieldDecorator('desc', {
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

const mapStateToProps = state => ({
  listsearch: state.root.listsearch
});

const mapDispatchToProps = {
  stateSuccess,
  stateUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(CreateForm));
