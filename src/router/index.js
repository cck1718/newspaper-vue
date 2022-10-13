import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/login"
    },
    {
      path: '/login',
      name: "Login",
      component: ()=>import("../views/Login")
    },
    {
      path: '/register',
      name: "Register",
      component: ()=>import("../views/Register")
    },
    {
      path: '/index',
      name: 'Index',
      component: ()=>import("../views/Index"),
      children:[
        {
          path: 'addArticle',
          name: 'AddArticle',
          component: ()=>import("../views/article/AddArticle")
        },
        {
          path: 'myArticleDraft',
          name: 'MyArticleDraft',
          component: ()=>import("../views/article/MyArticleDraft")
        },
        {
          path: 'myArticleRelease',
          name: 'MyArticleRelease',
          component: ()=>import("../views/article/MyArticleRelease")
        },
        {
          path: 'articleList',
          name: 'ArticleList',
          component: ()=>import("../views/article/ArticleList")
        },
      ]
    },
    {
      path: '/**',
      name: '404',
      component: ()=>import("../views/404")
    }
  ]
})
