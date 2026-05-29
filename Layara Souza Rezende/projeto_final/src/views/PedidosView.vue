<template>
  <div>
    <h1>Pedidos</h1>
    <lista-pedidos-component />
  </div>
</template>
<script>
import ListaPedidosComponent from '@/components/ListaPedidosComponent.vue';

export default {
  name: 'PedidosView',
  components: {
    ListaPedidosComponent,
  },
};
</script>
<style scoped></style>
