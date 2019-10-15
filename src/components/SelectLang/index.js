import React, { PureComponent } from 'react';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './style.less';

class SelectLang extends PureComponent {
  changeLang = ({ key }) => {
    console.log(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = 'zh-CN';
    const locales = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR'];
    const languageLabels = {
      'zh-CN': '简体中文',
      'zh-TW': '繁体中文',
      'en-US': 'English',
      'pt-BR': 'Português'
    };
    const languageIcons = {
      'zh-CN': '🇨🇳',
      'zh-TW': '🇭🇰',
      'en-US': '🇬🇧',
      'pt-BR': '🇧🇷'
    };
    const langMenu = (
      <Menu
        className={styles.menu}
        selectedKeys={[selectedLang]}
        onClick={this.changeLang}
      >
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{' '}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" title="切换语言" />
        </span>
      </HeaderDropdown>
    );
  }
}

export default SelectLang;
