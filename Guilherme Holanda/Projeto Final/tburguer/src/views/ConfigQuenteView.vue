<template>
  <div>
    <h1>Monte seu Pedido</h1>
    <pedido-quente-component-vue :item="this.itemSelecionado" />
  </div>
</template>
<script>
import PedidoQuenteComponentVue from "@/components/PedidoQuenteComponent.vue";

export default {
  name: "ConfigQuenteView",
  components: {
    PedidoQuenteComponentVue,
  },
  data() {
    return {
      itemSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.item) {
      const decodeItem = JSON.parse(decodeURIComponent(query.item));
      this.itemSelecionado = decodeItem;
    }
  },
};
</script>
<style scoped></style>
