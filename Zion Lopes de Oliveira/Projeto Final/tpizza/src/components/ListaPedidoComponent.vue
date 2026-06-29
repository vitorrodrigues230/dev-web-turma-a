<template>
  <div>
    <alert-component
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      @fechar="alerta.mensagem = ''"
    />
    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Pizza</div>
          <div>Massa</div>
          <div>Opcionais</div>
          <div>Status</div>
          <div id="div-acoes">Acoes</div>
        </div>
      </div>
    </div>
    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.pizza.nome }}</div>
      <div>{{ pedido.massa.descricao }}</div>
      <div>
        <ul>
          <li v-for="(adicional, index) in pedido.adicionais" :key="index">
            {{ adicional.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(bebida, index) in pedido.bebidas" :key="index">
            {{ bebida.nome }}
          </li>
        </ul>
      </div>
      <div>
        <select
          name="status"
          class="status"
          @change="atualizarStatusPedido($event, pedido.id)"
        >
          <option value="">Selecione</option>
          <option
            v-for="status in listaStatusPedido"
            :key="status.id"
            :value="status.id"
            :selected="status.id == pedido.statusId"
          >
            {{ status.descricao }}
          </option>
        </select>
      </div>
      <div id="div-acoes">
        <img
          @click="deletarPedido(pedido.id)"
          src="/img/icone_lixeira.png"
          width="35px"
          height="35px"
        />
      </div>
    </div>
  </div>
</template>
<script>
import AlertComponent from "./AlertComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    AlertComponent,
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      alerta: { tipo: "", mensagem: "" },
    };
  },
  methods: {
    async consultarPedidos() {
      const response = await fetch(`${this.$apiUrl}/pedidos`);
      const dados = await response.json();
      this.listaPedidosRealizados = dados;
    },
    async consultarStatusPedido() {
      const response = await fetch(`${this.$apiUrl}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async deletarPedido(id) {
      const response = await fetch(`${this.$apiUrl}/pedidos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        this.alerta = { tipo: "sucesso", mensagem: "Pedido removido com sucesso!" };
        this.consultarPedidos();
      } else {
        this.alerta = { tipo: "erro", mensagem: "Erro ao remover o pedido." };
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;

      if (!idPedidoAtualizado) {
        this.alerta = { tipo: "aviso", mensagem: "Selecione um status valido." };
        return;
      }

      const atualizaoJson = JSON.stringify({ statusId: idPedidoAtualizado });

      const response = await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: atualizaoJson,
      });

      if (response.ok) {
        this.alerta = { tipo: "info", mensagem: "Status do pedido atualizado." };
      } else {
        this.alerta = { tipo: "erro", mensagem: "Erro ao atualizar o status." };
      }
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();
  },
};
</script>
<style scoped>
#pedidos-tabela {
  width: 100%;
  margin: 0 auto;
}

#pedidos-tabela-cabecalho,
#pedidos-tabela-linhas,
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #222;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #222;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}
</style>
