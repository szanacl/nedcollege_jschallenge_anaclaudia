import NotFound from "./components/partials/notFound.vue";
import viewBlogs from "./components/blog/viewBlogs.vue";
import addBlog from "./components/blog/addBlog.vue";

export default [
    {
      path: "/",
      component: viewBlogs,
    },
    {
      path: "/add",
      component: addBlog,
    },
    {
      path: "/add/:id",
      component: addBlog,
    },
    // {
    //   path: "/register",
    //   component: register,
    // },
    // {
    //   path: "/login",
    //   component: login,
    // },
    {
        path: "*",
        component: NotFound,
    },
];