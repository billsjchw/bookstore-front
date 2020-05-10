import VueRouter from "vue-router"
import LoginView from "@/views/LoginView";
import BooksView from "@/views/BooksView";
import BookView from "@/views/BookView";
import ErrorView from "@/views/ErrorView";
import BookAdminView from "@/views/BookAdminView";
import CartView from "@/views/CartView";
import OrdersView from "@/views/OrdersView";

function checkUser(to, from, next) {
    if (!sessionStorage.getItem("user")) {
        next("/login");
        return;
    }
    next();
}

function checkBookAdmin(to, from, next) {
    if (!sessionStorage.getItem("user")) {
        next("/login");
        return;
    }
    let authorities = JSON.parse(sessionStorage.getItem("authorities"));
    if (!authorities.some(authority => authority.name === "BOOK_ADMIN")) {
        next("/")
        return;
    }
    next();
}

export default new VueRouter({
    mode: "history",
    routes: [
        { path: "/login", component: LoginView },
        { path: "/books", component: BooksView, beforeEnter: checkUser },
        { path: "/book/:isbn", component: BookView, beforeEnter: checkUser },
        { path: "/cart", component: CartView, beforeEnter: checkUser },
        { path: "/orders", component: OrdersView, beforeEnter: checkUser },
        { path: "/error/:err", component: ErrorView, beforeEnter: checkUser },
        { path: "/book-admin", component: BookAdminView, beforeEnter: checkBookAdmin },
        { path: "/*", redirect: "/books" }
    ]
});
