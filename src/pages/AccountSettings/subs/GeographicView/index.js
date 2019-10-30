import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'react-redux';
import styles from './style.less';

const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: ''
};

class GeographicView extends PureComponent {
  componentDidMount = () => {
    console.log(`dispatch({
      type: 'geographic/fetchProvince'
    });`);
  };

  componentDidUpdate(props) {
    const { value } = this.props;

    if (!props.value && !!value && !!value.province) {
      console.log(`dispatch({
        type: 'geographic/fetchCity',
        payload: value.province.key
      });`);
    }
  }

  getProvinceOption() {
    const { province } = this.props;
    return this.getOption(province);
  }

  getCityOption = () => {
    const { city } = this.props;
    return this.getOption(city);
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = item => {
    const { onChange } = this.props;
    console.log(`dispatch({
      type: 'geographic/fetchCity',
      payload: item.key
    });`);
    onChange({
      province: item,
      city: nullSlectItem
    });
  };

  selectCityItem = item => {
    const { value, onChange } = this.props;
    onChange({
      province: value.province,
      city: item
    });
  };

  conversionObject() {
    const { value } = this.props;
    console.log(value);
    if (!value) {
      return {
        province: nullSlectItem,
        city: nullSlectItem
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSlectItem,
      city: city || nullSlectItem
    };
  }

  render() {
    const { province, city } = this.conversionObject();
    const { loading } = this.props;
    return (
      <Spin spinning={loading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
        >
          {this.getCityOption()}
        </Select>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  accountsettings: state.root.accountsettings
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeographicView);
