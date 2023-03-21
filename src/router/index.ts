import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import StatsView from '../views/StatsView.vue'
import EditView from '../views/EditView.vue'
import LoginView from '../views/LoginView.vue'
import ProductsView from '../views/ListProdView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView,
  },
  {
    path: '/stats',
    name: 'Stats',
    component: StatsView,
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: EditView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
