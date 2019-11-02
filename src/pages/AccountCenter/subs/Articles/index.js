import React, { PureComponent } from 'react';
import { List, Icon, Tag } from 'antd';
import { connect } from 'react-redux';
import ArticleListContent from '@/components/ArticleListContent';
import * as accountcenterActions from '../../effects';
import styles from './style.less';

class Articles extends PureComponent {
  componentDidMount() {
    const { articlesDataUpdate } = this.props;
    articlesDataUpdate();
  }

  render() {
    const { accountcenter } = this.props;

    if (!accountcenter) return null;

    const {
      articles: {
        data: { list }
      }
    } = accountcenter;

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
  accountcenter: state.root.accountcenter
});

const mapDispatchToProps = {
  articlesDataUpdate: accountcenterActions.articlesDataUpdate
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
