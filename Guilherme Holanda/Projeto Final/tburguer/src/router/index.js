import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SobremesasView from "@/views/SobremesasView.vue";
import BebidasQuentesView from "@/views/BebidasQuentesView.vue";
import BebidasGeladasView from "@/views/BebidasGeladasView.vue";
import PedidosView from "@/views/PedidosView.vue";
import ConfigQuenteView from "@/views/ConfigQuenteView.vue";
import ConfigSimplesView from "@/views/ConfigSimplesView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sobremesas",
    name: "sobremesas",
    component: SobremesasView,
  },
  {
    path: "/bebidas-quentes",
    name: "bebidas-quentes",
    component: BebidasQuentesView,
  },
  {
    path: "/bebidas-geladas",
    name: "bebidas-geladas",
    component: BebidasGeladasView,
  },
  {
    path: "/pedidos",
    name: "pedidos",
    component: PedidosView,
  },
  {
    path: "/config-quente",
    name: "config-quente",
    component: ConfigQuenteView,
  },
  {
    path: "/config-simples",
    name: "config-simples",
    component: ConfigSimplesView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
