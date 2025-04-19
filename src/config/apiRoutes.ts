const API_BASE = 'https://backend-dev.nervlib.ru/api';
const createApiRoute = (route: string) => `${API_BASE}${route}`;

export const apiRoutes = {
  login: createApiRoute('/auth/signin'),
  curentUser: createApiRoute('/auth/current'),
  refresh: createApiRoute('/auth/refresh'),
  setGroup: createApiRoute('/users/set_group'),
  confirmUser: createApiRoute('/users/confirm'),
  myGroup: createApiRoute('users/my_group')
};
