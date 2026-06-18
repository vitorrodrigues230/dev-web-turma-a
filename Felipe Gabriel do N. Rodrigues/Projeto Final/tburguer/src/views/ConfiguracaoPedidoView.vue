<template>
  <div>
    <h1>Configuração dos Pedidos</h1>
    <pedido-component-vue :burguer="hamburguerSelecionado"/>
  </div>
</template>

<script>

import PedidoComponentVue from '@/components/PedidoComponent.vue';

export default {
  name: 'ConfiguracaoPeiddoView',
  components: {
    PedidoComponentVue,
  },
  data() {
    return {
      hamburguerSelecionado : null,
    };
  },
  mounted () {
    const query = this.$route.query;
    if(query.burguer) {
      const decodeBurguer = JSON.parse(decodeURIComponent(query.burguer));
      this.hamburguerSelecionado = decodeBurguer;
    }
  },
};
</script>

<style scoped></style>