<template>
  <div>
    <h1>Configuração do Pedido</h1>
    <pedido-component-vue :salgado="this.salgadoSelecionado" />
  </div>
</template>
<script>
import PedidoComponentVue from "@/components/PedidoComponent.vue";

export default {
  name: "ConfiguracaoPedidoView",
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      salgadoSelecionado: null,
    };
  },
  mounted() {
    const query = this.$route.query;
    if (query.salgado) {
      const decodeSalgado = JSON.parse(decodeURIComponent(query.salgado));
      this.salgadoSelecionado = decodeSalgado;
    }
  },
};
</script>
<style scoped></style>
