import pathToRegexp from 'path-to-regexp';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import setting from '@/config/customSetting';

const { contentTitle } = setting;

export const matchParamsPath = (pathname, breadcrumbNameMap) => {
  const pathKey = Object.keys(breadcrumbNameMap).find(key =>
    pathToRegexp(key).test(pathname)
  );
  return breadcrumbNameMap[pathKey];
};

const getPageTitle = (pathname, breadcrumbNameMap) => {
  const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);
  if (!currRouterData) {
    return contentTitle;
  }
  const locale = currRouterData.locale;

  return locale;

  // return `${pageName} - ${title}`;
};

export default memoizeOne(getPageTitle, isEqual);
