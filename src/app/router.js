// Dynamic importing based on requested routes
const ViewHome = () => import("~Views/home.vue");

const routes = [{ path: "/", component: ViewHome }];

module.exports = { routes };
