<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <pedido-component :cafe="this.cafeSelecionado" />
  </div>
</template>

<script>
import PedidoComponent from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponent,
  },
  data() {
    return {
      cafeSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.cafe) {
      const decodeCafe = JSON.parse(decodeURIComponent(query.cafe));
      this.cafeSelecionado = decodeCafe;
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 24px 0;
  font-family: Georgia, serif;
  color: #1C0A00;
}
</style>