import VueRouter from "vue-router"
import LoginView from "@/views/LoginView";
import BooksView from "@/views/BooksView";
import InfoView from "@/views/InfoView";
import ErrorView from "@/views/ErrorView";
import BookAdminView from "@/views/BookAdminView";

export default new VueRouter({
    mode: "history",
    routes: [
        {path: "/login", component: LoginView},
        {path: "/books", component: BooksView},
        {path: "/books/:isbn", component: InfoView},
        {path: "/errors/:err", component: ErrorView},
        {path: "/book-admin", component: BookAdminView},
        {path: "/*", redirect: "/login"}
    ]
});
