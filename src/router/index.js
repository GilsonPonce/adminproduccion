import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/color',
    name: 'Color',
    component: () => import('../views/Color.vue')
  },
  {
    path: '/linea',
    name: 'Linea',
    component: () => import('../views/Linea.vue')
  },
  {
    path: '/material',
    name: 'Material',
    component: () => import('../views/Material.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import('../views/Perfil.vue')
  },
  {
    path: '/proceso',
    name: 'Proceso',
    component: () => import('../views/Proceso.vue')
  },
  {
    path: '/tarifario',
    name: 'Tarifario',
    component: () => import('../views/Tarifario.vue')
  },
  {
    path: '/tipo_desperdicio',
    name: 'Tipo_desperdicio',
    component: () => import('../views/Tipo_desperdicio.vue')
  },
  {
    path: '/tipo_material',
    name: 'Tipo_material',
    component: () => import('../views/Tipo_material.vue')
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: () => import('../views/Usuario.vue')
  },
  {
    path: '/informe',
    name: 'Informe',
    component: () => import('../views/Informe.vue')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import('../views/Personal.vue')
  },
  {
    path: '/registro/:id',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/producto_terminado/:id',
    name: 'ProductoTerminado',
    component: () => import('../views/Producto_terminado.vue')
  },
  {
    path: '/materia_prima/:id',
    name: 'MateriaPrima',
    component: () => import('../views/Materia_prima.vue')
  },
  {
    path: '/scrap/:id',
    name: 'Scrap',
    component: () => import('../views/Scrap.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
