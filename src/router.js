import TaskInfo from './components/TaskInfo/TaskInfo';
import Home from './components/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import NotFound from './components/Error/NotFound/NotFound';
import { store } from './store/store';
import {ROLES} from "./utils/constants";

// const ifNotAuthenticated = (to, from, next) => {
//     if (!store.getters.isLogged) {
//         next('/login');
//         return;
//     }
//     next();
// };
//
// const ifAuthenticated = (to, from, next) => {
//     if (store.getters.isLogged) {
//         next('/');
//         return;
//     }
//     next();
// };

// const ifAuth = (to, from, next) => {
//   if (store.getters.isLogged) {
//       next('/');
//       return
//   }
//   else if (!store.getters.isLogged) {
//       next('/register');
//       return;
//   }
//   next();
// };

const ifAuth = async (to, from, next) => {
    if (store.getters.isLogged) {
        const accessIsAllowed = to.meta.accessIsAllowed;
        const userRoleId = await getUserRoleId();

        if (accessIsAllowed !== undefined) {
            if (accessIsAllowed.includes(userRoleId)) {
                next();
            } else {
                next('/notFound');
            }
        } else {
            next();
        }

    } else {
        next('/login');
    }
};

const ifNotAuth = (to, from, next) => {
    if (!store.getters.isLogged) {
        next();
    } else {
        next('/');
    }
};

const getUserRoleId = async () => {
    let userRoleId = store.getters.currentUser;

    if (userRoleId === null) {
        await store.dispatch('getCurrentUser');
        userRoleId = store.getters.currentUser;
    }

    return userRoleId.role_id;
};

const allRoles = () => Object.values(ROLES.ID);
// const allRolesExcept = (...exceptRoles) => Object.values(ROLES.ID).filter(role => exceptRoles.indexOf(role) === -1);



export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        beforeEnter: ifAuth,
        meta: {
            accessIsAllowed: allRoles(),
        },
    },
    {
        path: '/task/:id',
        name: 'TaskInfo',
        component: TaskInfo,
        props: true,
        beforeEnter: ifAuth,
        meta: {
            accessIsAllowed: allRoles(),
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuth,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        beforeEnter: ifNotAuth,
    },
    {
        path: '*',
        name: 'notFound',
        component: NotFound,
    },
];