<template>
  <div>
    <alerta-component-vue
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      :visivel="alerta.visivel"
      @fechar="fecharAlerta"
    />
    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Item</div>
          <div>Tamanho</div>
          <div>Opcionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
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
      <div>{{ pedido.item && pedido.item.nome ? pedido.item.nome : "-" }}</div>
      <div>{{ pedido.tamanho && pedido.tamanho.descricao ? pedido.tamanho.descricao : "-" }}</div>
      <div>
        <ul v-if="pedido.adicionais">
          <li v-for="(adicional, index) in pedido.adicionais" :key="index">
            {{ adicional.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul v-if="pedido.acompanhamentos">
          <li v-for="(acompanhamento, index) in pedido.acompanhamentos" :key="index">
            {{ acompanhamento.nome }}
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
import AlertaComponentVue from "@/components/AlertaComponent.vue";

export default {
  name: "ListaPedidoComponent",
  components: {
    AlertaComponentVue,
  },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      alerta: { visivel: false, tipo: "aviso", mensagem: "" },
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
    mostrarAlerta(tipo, mensagem) {
      this.alerta = { visivel: true, tipo: tipo, mensagem: mensagem };
    },
    fecharAlerta() {
      this.alerta.visivel = false;
    },
    async deletarPedido(id) {
      await fetch(`${this.$apiUrl}/pedidos/${id}`, {
        method: "DELETE",
      });
      this.consultarPedidos();
      this.mostrarAlerta("sucesso", "Pedido excluído com sucesso!");
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;

      const atualizaoJson = JSON.stringify({ statusId: idPedidoAtualizado });

      await fetch(`${this.$apiUrl}/pedidos/${idPedido}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: atualizaoJson,
      });
      this.consultarPedidos();
      this.mostrarAlerta("sucesso", "Status do pedido atualizado.");
    },
  },
  mounted() {
    this.consultarPedidos();
    this.consultarStatusPedido();

    if (this.$route.query.sucesso === "true") {
      this.mostrarAlerta("sucesso", "Pedido confirmado com sucesso!");
    }
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
