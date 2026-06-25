<template>
  <div>
    <h1>Pedidos</h1>
    <h2>Lista de Pedidos</h2>
    <lista-pedido-component-vue />
  </div>
</template>
<script>
import ListaPedidoComponentVue from "@/components/ListaPedidoComponent.vue";

export default {
  name: "PedidosView",
  components: {
    ListaPedidoComponentVue,
  },
};
</script>
<style scoped></style>