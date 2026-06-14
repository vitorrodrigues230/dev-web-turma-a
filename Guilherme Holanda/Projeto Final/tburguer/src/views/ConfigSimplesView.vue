<template>
  <div>
    <h1>Monte seu Pedido</h1>
    <pedido-simples-component-vue :item="this.itemSelecionado" />
  </div>
</template>
<script>
import PedidoSimplesComponentVue from "@/components/PedidoSimplesComponent.vue";

export default {
  name: "ConfigSimplesView",
  components: {
    PedidoSimplesComponentVue,
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
