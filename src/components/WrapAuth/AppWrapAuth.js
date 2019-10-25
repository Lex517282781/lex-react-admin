import wrapAuth from './wrapAuth';
import appPermissions from '@/config/appPermissions';

const appWrapAuth = wrapAuth(appPermissions);

const AppWrap = appWrapAuth('div');

export { appWrapAuth };
export default AppWrap;
