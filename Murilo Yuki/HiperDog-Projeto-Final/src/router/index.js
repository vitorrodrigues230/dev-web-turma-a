import { createRouter, createWebHistory } from "vue-router";
import MenuVue from "@/views/MenuVue.vue";
import ConfiguracaoPedidosVue from "@/views/ConfiguracaoPedidosVue.vue";
import PedidosVue from "@/views/PedidosVue.vue";

const routes = [
  {
    path: "/",
    name: "menu",
    component: MenuVue,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuVue,
  },
  {
    path: "/pedidos",
    name: "pedidos",
    component: PedidosVue,
  },
  {
    path: "/config",
    name: "config",
    component: ConfiguracaoPedidosVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;