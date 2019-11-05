import React, { PureComponent, forwardRef } from 'react';
import { Select, Spin } from 'antd';
import { connect } from 'react-redux';
import { stateFetch } from '@/store/actionCreators';
import styles from './style.less';

const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: ''
};

class GeographicView extends PureComponent {
  componentDidMount = () => {
    const { stateFetch } = this.props;
    stateFetch({
      namespace: `common/province`,
      api: `getProvince`
    });
  };

  componentDidUpdate(props) {
    const { value, stateFetch } = this.props;

    if (!props.value && !!value && !!value.province) {
      stateFetch({
        namespace: `common/city`,
        api: `getCity`,
        params: {
          key: value.province.key
        }
      });
    }
  }

  getProvinceOption() {
    const { province } = this.props;
    return this.getOption(province.data);
  }

  getCityOption = () => {
    const { city } = this.props;
    return this.getOption(city.data);
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
    console.log(item)
    stateFetch({
      namespace: `common/city`,
      api: `getCity`,
      params: {
        key: item.key
      }
    });
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
    const {
      province: { loading: provinceLoading },
      city: { loading: cityLoading }
    } = this.props;
    const { province, city } = this.conversionObject();
    return (
      <div className={styles.row}>
        <Spin spinning={provinceLoading} wrapperClassName={styles.item}>
          <Select
            value={province}
            labelInValue
            showSearch
            onSelect={this.selectProvinceItem}
          >
            {this.getProvinceOption()}
          </Select>
        </Spin>
        <Spin spinning={cityLoading} wrapperClassName={styles.item}>
          <Select
            value={city}
            labelInValue
            showSearch
            onSelect={this.selectCityItem}
          >
            {this.getCityOption()}
          </Select>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = rootState => ({
  accountsettings: rootState.accountsettings,
  province: rootState.common.province,
  city: rootState.common.province
});

const mapDispatchToProps = { stateFetch };

const ConnectGeographicView = connect(
  mapStateToProps,
  mapDispatchToProps
)(GeographicView);

export default forwardRef((props, ref) => (
  <ConnectGeographicView {...props} geographicViewRef={ref} />
));
