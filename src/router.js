import VueRouter from "vue-router"
import LoginView from "@/views/LoginView";
import BooksView from "@/views/BooksView";
import DetailView from "@/views/DetailView";

export default new VueRouter({
    mode: "history",
    routes: [
        {path: "/login", component: LoginView},
        {path: "/books", component: BooksView},
        {path: "/books/:isbn", component: DetailView},
        {path: "/", redirect: "/login"}
    ]
});
