import React, { PureComponent } from 'react';
import { List, Icon, Tag } from 'antd';
import { connect } from 'react-redux';
import ArticleListContent from '@/components/ArticleListContent';
import { stateSuccess } from '@/store/actionCreators';
import { tableData } from '@/mock/custom/ListArticles';
import styles from './style.less';

class Articles extends PureComponent {
  UNSAFE_componentWillMount() {
    const { stateSuccess } = this.props;
    stateSuccess({
      namespace: 'listarticles/tableData',
      data: {
        list: tableData.list,
        pagination: tableData.pagination
      }
    });
  }

  render() {
    const { listarticles } = this.props;

    if (!listarticles) return null;

    const {
      tableData: {
        data: { list }
      }
    } = listarticles;

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    return (
      <List
        size="large"
        className={styles.articleList}
        rowKey="id"
        itemLayout="vertical"
        dataSource={list}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="star-o" text={item.star} />,
              <IconText type="like-o" text={item.like} />,
              <IconText type="message" text={item.message} />
            ]}
          >
            <List.Item.Meta
              title={
                <a className={styles.listItemMetaTitle} href={item.href}>
                  {item.title}
                </a>
              }
              description={
                <span>
                  <Tag>Ant Design</Tag>
                  <Tag>设计语言</Tag>
                  <Tag>蚂蚁金服</Tag>
                </span>
              }
            />
            <ArticleListContent data={item} />
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  listarticles: state.root.listarticles
});

const mapDispatchToProps = {
  stateSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
