import wrapAuth from './wrapAuth';
import appRouter from '@/config/appRouter';
import appPermissions from '@/config/appPermissions';
import getRouterMenu from '@/utils/getRouterMenu';
import getRouterAuths from '@/utils/getRouterAuths';

const routerMenu = getRouterMenu(appRouter);

const appWrapAuth = wrapAuth([
  ...appPermissions,
  ...getRouterAuths(routerMenu)
]);

const AppWrap = appWrapAuth('div');

export { appWrapAuth };
export default AppWrap;
