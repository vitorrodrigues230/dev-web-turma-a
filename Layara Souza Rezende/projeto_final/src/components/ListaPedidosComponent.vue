<template>
  <div>
    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div class="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Hamburguer</div>
          <div>Ponto</div>
          <div>Opcionais</div>
          <div>Status</div>
          <div class="div-acoes">Ações</div>
        </div>
      </div>

      <div
        class="pedidos-tabela-linha"
        v-for="pedido in listaPedidosRealizados"
        :key="pedido.id"
      >
        <div class="ordem-numero">{{ pedido.id }}</div>
        <div>{{ pedido.nome }}</div>
        <div>{{ pedido.hamburguer.nome }}</div>
        <div>{{ pedido.ponto.descricao }}</div>
        <div>
          <ul>
            <li v-for="(complemento, index) in pedido.complemento" :key="'comp-' + index">
              {{ complemento.nome }}
            </li>
          </ul>
          <ul>
            <li v-for="(bebida, index) in pedido.bebidas" :key="'beb-' + index">
              {{ bebida.nome }}
            </li>
           </ul>
        </div>
        <div>
          <label for="status"></label>
          <select name="status" class="status" @change="atualizarStatusPedido($event, pedido.id)">
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
        <div class="div-acoes">
          <img @click="deletarPedido(pedido.id)"
            @keydown="deletarPedido(pedido.id)"
            src="/img/icone_lixeira.png"
            width="35px"
            height="35px"
            alt="Excluir pedido"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListaPedidoComponent',
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
    };
  },
  methods: {
    async consultarPedidos() {
      try {
        const response = await fetch('http://localhost:3000/pedidos');
        if (!response.ok) throw new Error('Erro ao buscar pedidos');
        this.listaPedidosRealizados = await response.json();
      } catch (e) {
        console.error(e);
      }
    },
    async consultarStatusPedido() {
      try {
        const response = await fetch('http://localhost:3000/status_pedido');
        if (!response.ok) throw new Error('Erro ao buscar status');
        this.listaStatusPedido = await response.json();
      } catch (e) {
        console.error(e);
      }
    },
    async deletarPedido(id) {
      await fetch(`http://localhost:3000/pedidos/${id}`, {
        method: 'DELETE',
      });
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      const atualizacaoJson = JSON.stringify({ statusId: idPedidoAtualizado });
      await fetch(`http://localhost:3000/pedidos/${idPedido}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: atualizacaoJson,
      });
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
.pedidos-tabela-linha {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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

#pedidos-tabela-cabecalho .ordem-id,
.pedidos-tabela-linha .ordem-numero,
.pedidos-tabela-linha .div-acoes,
#pedidos-tabela-cabecalho .div-acoes {
  width: 5%;
}
</style>
