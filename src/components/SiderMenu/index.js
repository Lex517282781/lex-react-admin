import React from 'react';
import { Drawer } from 'antd';
import SiderMenu from './subs/SiderMenu';
import { getFlatMenuKeys } from './tools';

const SiderMenuWrapper = React.memo(props => {
  const { isMobile, menuData, collapsed, onCollapse, siderWidth } = props;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  return isMobile ? (
    <Drawer
      width={siderWidth}
      visible={!collapsed}
      placement="left"
      onClose={() =>
        onCollapse({
          collapsed: true
        })
      }
      style={{
        padding: 0,
        height: '100vh'
      }}
    >
      <SiderMenu
        {...props}
        flatMenuKeys={flatMenuKeys}
        collapsed={isMobile ? false : collapsed}
      />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  );
});

export default SiderMenuWrapper;
