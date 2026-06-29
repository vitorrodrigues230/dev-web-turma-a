<template>
  <div>
    <h1>Pedidos</h1>
    <div v-if="msg" :class="['alerta', msg.tipo]">
      <span class="alerta-icone">{{ iconeAlerta(msg.tipo) }}</span>
      {{ msg.texto }}
    </div>
    <div id="pedidos-container">
      <div
        id="pedido-card"
        v-for="pedido in listaPedidos"
        :key="pedido.id"
      >
        <div id="pedido-header">
          <p id="pedido-nome">{{ pedido.nome }}</p>
          <img
            id="icone-lixeira"
            src="/img/icone_lixeira.png"
            @click="deletarPedido(pedido.id)"
            title="Excluir pedido"
          />
        </div>
        <div id="pedido-salgado">
          <img :src="pedido.salgado && pedido.salgado.foto ? pedido.salgado.foto : ''" id="foto-salgado" />
          <p id="nome-salgado">{{ pedido.salgado && pedido.salgado.nome ? pedido.salgado.nome : '-' }}</p>
        </div>
        <div id="pedido-detalhes">
          <div v-if="pedido.complementos && pedido.complementos.length">
            <p class="detalhe-titulo">Complementos:</p>
            <span
              class="detalhe-item"
              v-for="complemento in pedido.complementos"
              :key="complemento.id"
            >
              {{ complemento.nome }}
            </span>
          </div>
          <div v-if="pedido.bebidas && pedido.bebidas.length">
            <p class="detalhe-titulo">Bebidas:</p>
            <span
              class="detalhe-item"
              v-for="bebida in pedido.bebidas"
              :key="bebida.id"
            >
              {{ bebida.nome }}
            </span>
          </div>
        </div>
        <div id="pedido-status">
          <p>Status: <strong>{{ pedido.statusId }}</strong></p>
        </div>
      </div>
      <p v-if="listaPedidos.length === 0" id="sem-pedidos">Nenhum pedido realizado ainda.</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "PedidosView",
  data() {
    return {
      listaPedidos: [],
      msg: null,
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch("http://localhost:3000/pedidos");
      const dados = await response.json();
      this.listaPedidos = dados;
    },
    iconeAlerta(tipo) {
      const icones = { sucesso: "✔", erro: "✖", aviso: "⚠", info: "ℹ" };
      return icones[tipo] || "";
    },
    async deletarPedido(id) {
      const response = await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.listaPedidos = this.listaPedidos.filter((p) => p.id !== id);
        this.msg = { texto: "Pedido excluído com sucesso!", tipo: "sucesso" };
        setTimeout(() => {
          this.msg = null;
        }, 2000);
      } else {
        this.msg = { texto: "Erro ao excluir o pedido.", tipo: "erro" };
      }
    },
  },
  mounted() {
    this.consultarPedidos();
  },
};
</script>
<style scoped>
#pedidos-container {
  max-width: 750px;
  margin: 0 auto;
  padding: 16px;
}

#pedido-card {
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px #444;
  margin-bottom: 20px;
  overflow: hidden;
}

#pedido-header {
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 4px solid darkgoldenrod;
}

#pedido-nome {
  font-size: 22px;
  font-weight: bold;
  color: darkgoldenrod;
  margin: 0;
}

#icone-lixeira {
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: 0.2s;
}

#icone-lixeira:hover {
  width: 32px;
  height: 32px;
}

#pedido-salgado {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  gap: 16px;
  background-color: #f9f9f9;
}

#foto-salgado {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

#nome-salgado {
  font-size: 20px;
  font-weight: bold;
  color: #222;
  margin: 0;
}

#pedido-detalhes {
  padding: 12px 20px;
}

.detalhe-titulo {
  font-weight: bold;
  color: #222;
  margin: 8px 0 4px;
  border-left: 4px solid darkgoldenrod;
  padding-left: 8px;
}

.detalhe-item {
  display: inline-block;
  background-color: #eee;
  border-radius: 8px;
  padding: 4px 10px;
  margin: 4px;
  font-size: 13px;
  color: #333;
}

#pedido-status {
  padding: 10px 20px;
  background-color: #f0f0f0;
  border-top: 1px solid #ddd;
  text-align: right;
  font-size: 14px;
  color: #555;
}

#sem-pedidos {
  text-align: center;
  font-size: 18px;
  color: gray;
  margin-top: 40px;
}

.alerta {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: bold;
  margin: 16px auto;
  text-align: center;
  max-width: 750px;
}

.sucesso {
  background-color: #28a745;
  color: white;
}

.erro {
  background-color: #dc3545;
  color: white;
}

.aviso {
  background-color: #fd7e14;
  color: white;
}

.info {
  background-color: #17a2b8;
  color: white;
}

.alerta-icone {
  margin-right: 8px;
  font-size: 18px;
}
</style>
