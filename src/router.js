import VueRouter from "vue-router"
import LoginView from "@/views/LoginView";
import BooksView from "@/views/BooksView";
import BookView from "@/views/BookView";
import ErrorView from "@/views/ErrorView";
import BookAdminView from "@/views/BookAdminView";

function checkUser(to, from, next) {
    if (!sessionStorage.getItem("user"))
        next("/login");
    else
        next();
}

function checkAdmin(to, from, next) {
    if (!sessionStorage.getItem("user"))
        next("/login");
    else if (sessionStorage.getItem("admin") === "false")
        next("/");
    else
        next();
}

export default new VueRouter({
    mode: "history",
    routes: [
        {path: "/login", component: LoginView},
        {path: "/books", component: BooksView, beforeEnter: checkUser},
        {path: "/book/:isbn", component: BookView, beforeEnter: checkUser},
        {path: "/error/:err", component: ErrorView, beforeEnter: checkUser},
        {path: "/book-admin", component: BookAdminView, beforeEnter: checkAdmin},
        {path: "/*", redirect: "/books"}
    ]
});
