import VueRouter from "vue-router"
import LoginPage from "@/pages/LoginPage";
import BooksPage from "@/pages/BooksPage";

export default new VueRouter({
    mode: "history",
    routes: [
        {path: "/login", component: LoginPage},
        {path: "/books", component: BooksPage},
        {path: "/", redirect: "/login"}
    ]
});
