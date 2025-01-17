import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView';
import HomeView from '@/views/HomeView';
import util from '@/utils/util';
import BookView from '@/views/BookView';
import CartView from '@/views/CartView';
import CheckoutView from '@/views/CheckoutView';
import OrdersView from '@/views/OrdersView';
import OrderAdminView from '@/views/OrderAdminView';
import constant from '@/utils/constant';
import BookAdminView from '@/views/BookAdminView';
import EditBookView from '@/views/EditBookView';
import AddBookView from '@/views/AddBookView';
import UserAdminView from '@/views/UserAdminView';
import RegisterView from '@/views/RegisterView';
import StatView from '@/views/StatView';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { name: 'Login', path: '/login', component: LoginView },
    { name: 'Home', path: '/home', component: HomeView },
    { name: 'Book', path: '/book/:id', component: BookView },
    { name: 'Cart', path: '/cart', component: CartView },
    { name: 'Checkout', path: '/checkout', component: CheckoutView },
    { name: 'Order', path: '/orders', component: OrdersView },
    { name: 'OrderAdmin', path: '/order-admin', component: OrderAdminView },
    { name: 'BookAdmin', path: '/book-admin', component: BookAdminView },
    { name: 'EditBook', path: '/edit-book/:id', component: EditBookView },
    { name: 'AddBook', path: '/add-book', component: AddBookView },
    { name: 'UserAdmin', path: '/user-admin', component: UserAdminView },
    { name: 'Register', path: '/register', component: RegisterView },
    { name: 'Stat', path: '/stat', component: StatView },
    { name: 'Others', path: '/*', redirect: '/home' },
  ],
});

router.beforeEach((to, from, next) => {
  let user = util.getUser();
  if (to.name === 'Login' || to.name === 'Register')
    next();
  else if (user === null)
    next({ name: 'Login' });
  else if (to.name === 'OrderAdmin' &&
      !util.checkAuthority(user, constant.AuthorityId.ORDER_ADMIN))
    next({ name: 'Home' });
  else if ((to.name === 'BookAdmin' || to.name === 'EditBook' || to.name === 'AddBook') &&
      !util.checkAuthority(user, constant.AuthorityId.BOOK_ADMIN))
    next({ name: 'Home' });
  else if (to.name === 'UserAdmin' &&
      !util.checkAuthority(user, constant.AuthorityId.USER_ADMIN))
    next({ name: 'Home' });
  else
    next();
});

export default router;
