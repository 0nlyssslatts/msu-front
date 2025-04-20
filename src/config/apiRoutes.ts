const API_BASE = "https://backend.where-pizza.ru/api";
const API_BASE_SCHEDULE = "https://api.profcomff.com/timetable/event";
const createApiRoute = (route: string) => `${API_BASE}${route}`;
const createApiRouteSchedule = (route: string) =>
    `${API_BASE_SCHEDULE}${route}`;

export const apiRoutes = {
    login: createApiRoute("/auth/signin"),
    curentUser: createApiRoute("/auth/current"),
    refresh: createApiRoute("/auth/refresh"),
    schedule: createApiRouteSchedule("/"),
    setGroup: createApiRoute('/users/set_group'),
    confirmUser: createApiRoute('/elder/confirm'),
    myGroup: createApiRoute('/elder/my_group'),
    tasks: createApiRoute('/tasks'),
    task_detail: (id: number) => createApiRoute(`/tasks/${id}`),
};
