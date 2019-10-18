import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

class DashboardAnalysis extends Component {
  render() {
    return <GridContent>DashboardAnalysis</GridContent>;
  }
}

const mapStateToProps = state => ({
  contentWidth: state.common.setting.contentWidth
});

export default connect(mapStateToProps)(DashboardAnalysis);
