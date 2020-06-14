import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView';
import HomeView from '@/views/HomeView';
import util from '@/utils/util';
import BookView from '@/views/BookView';
import CartView from '@/views/CartView';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'Login', path: '/login', component: LoginView },
    { name: 'Home', path: '/home', component: HomeView },
    { name: 'Book', path: '/book/:id', component: BookView },
    { name: 'Cart', path: '/cart', component: CartView },
    { name: 'Others', path: '/*', redirect: '/home' },
  ],
});

router.beforeEach((to, from, next) => {
  let user = util.getUser();
  if (to.name !== 'Login' && !user)
    next({ name: 'Login' });
  else
    next();
});

export default router;
