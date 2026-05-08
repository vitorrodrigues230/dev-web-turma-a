import { createRouter, createWebHistory } from 'vue-router'
import PedidosView from '@/views/PedidosView.vue'
import MenuView from '@/views/MenuView.vue'
import ConfiguracaoPedidoView from '@/views/ConfiguracaoPedidoView.vue'


const routes = [
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
    {
    path: '/pedidos',
    name: 'pedidos',
    component: PedidosView
  },
    {
    path: '/config',
    name: 'config',
    component: ConfiguracaoPedidoView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
