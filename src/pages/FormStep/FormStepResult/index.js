import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
import Result from '@/components/Result';
import styles from '../step.less';

class FormStepResult extends React.PureComponent {
  handleFinish = () => {
    const { history } = this.props;
    history.push('/form/step/info');
  };

  render() {
    const { formstep } = this.props;

    if (!formstep) return null;

    const {
      formData: { data }
    } = formstep;

    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            付款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.payAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款账户：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverAccount}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            收款人姓名：
          </Col>
          <Col xs={24} sm={16}>
            {data.receiverName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            转账金额：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.money}>{data.amount}</span> 元
          </Col>
        </Row>
      </div>
    );
    const actions = (
      <Fragment>
        <Button type="primary" onClick={this.handleFinish}>
          再转一笔
        </Button>
        <Button>查看账单</Button>
      </Fragment>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="预计两小时内到账"
        extra={information}
        actions={actions}
        className={styles.result}
      />
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
)(FormStepResult);
