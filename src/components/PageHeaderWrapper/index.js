import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { PageHeader, Tabs, Typography } from 'antd';
import classNames from 'classnames';
import GridContent from './GridContent';
import MenuContext from '@/layouts/context/MenuContext';
import { conversionBreadcrumbList } from './breadcrumb';
import styles from './style.less';

const { Title } = Typography;
/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter = ({
  tabList,
  tabActiveKey,
  onTabChange,
  tabBarExtraContent
}) => {
  return tabList && tabList.length ? (
    <Tabs
      className={styles.tabs}
      activeKey={tabActiveKey}
      onChange={key => {
        if (onTabChange) {
          onTabChange(key);
        }
      }}
      tabBarExtraContent={tabBarExtraContent}
    >
      {tabList.map(item => (
        <Tabs.TabPane tab={item.name} key={item.key} />
      ))}
    </Tabs>
  ) : null;
};

const PageHeaderWrapper = ({
  children,
  contentWidth,
  fluid,
  wrapperClassName,
  home,
  top,
  title,
  subTitle,
  content,
  logo,
  extraContent,
  hiddenBreadcrumb,
  intl: { formatMessage },
  location,
  breadcrumbNameMap,
  ...restProps
}) => {
  const {
    match: { path }
  } = restProps;

  const currentPage = breadcrumbNameMap[path];

  if (currentPage && formatMessage({ id: currentPage.locale }))
    title = title || formatMessage({ id: currentPage.locale });

  if (subTitle) title = title + subTitle;

  return (
    <div
      style={{ margin: '-24px -24px 0' }}
      className={classNames(wrapperClassName, styles.main)}
    >
      {top}
      <MenuContext.Consumer>
        {value => {
          return (
            <div className={styles.wrapper}>
              <div
                className={classNames({
                  [styles.wide]: !fluid && contentWidth === 'Fixed'
                })}
              >
                <PageHeader
                  title={
                    <>
                      {logo && <span className={styles.logo}>{logo}</span>}
                      <Title
                        level={4}
                        style={{
                          marginBottom: 0,
                          display: 'inline-block'
                        }}
                      >
                        {title || formatMessage({ id: currentPage.locale })}
                      </Title>
                    </>
                  }
                  key="pageheader"
                  {...restProps}
                  breadcrumb={
                    !hiddenBreadcrumb &&
                    conversionBreadcrumbList({
                      formatMessage,
                      ...value,
                      ...restProps,
                      ...(home !== null && {
                        home: (
                          <FormattedMessage
                            id="menu.home"
                            defaultMessage="Home"
                          />
                        )
                      })
                    })
                  }
                  className={styles.pageHeader}
                  linkElement={Link}
                  footer={renderFooter(restProps)}
                >
                  <div className={styles.detail}>
                    <div className={styles.main}>
                      <div className={styles.row}>
                        {content && (
                          <div className={styles.content}>{content}</div>
                        )}
                        {extraContent && (
                          <div className={styles.extraContent}>
                            {extraContent}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </PageHeader>
              </div>
            </div>
          );
        }}
      </MenuContext.Consumer>
      {children ? (
        <div className={styles['children-content']}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  contentWidth: state.root.common.setting.contentWidth,
  breadcrumbNameMap: state.root.common.menu.breadcrumbNameMap
});

export default withRouter(
  connect(mapStateToProps)(injectIntl(PageHeaderWrapper))
);
