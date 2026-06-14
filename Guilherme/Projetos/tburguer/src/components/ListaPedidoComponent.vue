<template>
  <div>
    <!-- Alerta semântico -->
    <alerta-component
      v-if="alerta.mensagem"
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      :duracao="alerta.duracao"
      @fechar="limparAlerta"
    />

    <div id="pedidos-tabela">
      <div>
        <div id="pedidos-tabela-cabecalho">
          <div id="ordem-id">#ID</div>
          <div>Nome</div>
          <div>Café</div>
          <div>Tamanho</div>
          <div>Opcionais</div>
          <div>Status</div>
          <div id="div-acoes">Ações</div>
        </div>
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-if="listaPedidosRealizados.length === 0" id="estado-vazio">
      <p>☕ Nenhum pedido ainda. Que tal um café?</p>
      <router-link to="/menu" class="btn-vazio">Ver Cardápio</router-link>
    </div>

    <div
      class="pedidos-tabela-linha"
      v-for="pedido in listaPedidosRealizados"
      :key="pedido.id"
    >
      <div id="ordem-numero">{{ pedido.id }}</div>
      <div>{{ pedido.nome }}</div>
      <div>{{ pedido.cafe ? pedido.cafe.nome : "-" }}</div>
      <div>{{ pedido.tamanho ? pedido.tamanho.descricao : "-" }}</div>
      <div>
        <ul>
          <li v-for="(acomp, index) in pedido.acompanhamentos" :key="'a' + index">
            {{ acomp.nome }}
          </li>
        </ul>
        <div class="divider"></div>
        <ul>
          <li v-for="(bebida, index) in pedido.bebidas" :key="'b' + index">
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
        <button class="btn-deletar" @click="deletarPedido(pedido.id)" title="Excluir pedido">
          🗑
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

const API = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
  name: "ListaPedidoComponent",
  components: { AlertaComponent },
  data() {
    return {
      listaPedidosRealizados: [],
      listaStatusPedido: [],
      alerta: { tipo: "info", mensagem: "", duracao: 4000 },
    };
  },
  methods: {
    async consultarPedidos() {
      try {
        const response = await fetch(`${API}/pedidos`);
        const dados = await response.json();
        this.listaPedidosRealizados = dados;
      } catch {
        this.exibirAlerta("erro", "Erro ao carregar pedidos. Verifique se a API está ativa.");
      }
    },
    async consultarStatusPedido() {
      const response = await fetch(`${API}/status_pedido`);
      this.listaStatusPedido = await response.json();
    },
    async deletarPedido(id) {
      try {
        const response = await fetch(`${API}/pedidos/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error();

        // Remove reativamente sem reload
        this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
          (p) => p.id !== id
        );
        this.exibirAlerta("sucesso", "Pedido excluído com sucesso!");
      } catch {
        this.exibirAlerta("erro", "Erro ao excluir o pedido.");
      }
    },
    async atualizarStatusPedido(event, idPedido) {
      const idPedidoAtualizado = event.target.value;
      try {
        const response = await fetch(`${API}/pedidos/${idPedido}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statusId: idPedidoAtualizado }),
        });
        if (!response.ok) throw new Error();
        this.exibirAlerta("sucesso", "Status atualizado com sucesso!");
      } catch {
        this.exibirAlerta("erro", "Erro ao atualizar o status.");
      }
    },
    exibirAlerta(tipo, mensagem, duracao = 4000) {
      this.alerta = { tipo, mensagem, duracao };
    },
    limparAlerta() {
      this.alerta = { tipo: "info", mensagem: "", duracao: 4000 };
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
}

#pedidos-tabela-cabecalho {
  font-weight: bold;
  padding: 12px;
  border-bottom: 2px solid #1C0A00;
  background: #F5E6C8;
  border-radius: 8px 8px 0 0;
}

#pedidos-tabela-cabecalho div,
.pedidos-tabela-linha div {
  width: 18%;
}

.pedidos-tabela-linha {
  width: 100%;
  padding: 12px;
  border-bottom: 1px dotted #C47A2B;
}

.pedidos-tabela-linha:hover {
  background: #fdf6ec;
}

#pedidos-tabela-cabecalho #ordem-id,
.pedidos-tabela-linha #ordem-numero,
.pedidos-tabela-linha #div-acoes,
#pedidos-tabela-cabecalho #div-acoes {
  width: 5%;
}

.status {
  border: 1px solid #C47A2B;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.btn-deletar {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  transition: 0.2s;
  padding: 4px;
  border-radius: 6px;
}
.btn-deletar:hover {
  background: #fdf0f0;
  transform: scale(1.15);
}

/* Estado vazio */
#estado-vazio {
  text-align: center;
  padding: 3rem 1rem;
  color: #888;
  font-size: 1rem;
}
.btn-vazio {
  display: inline-block;
  margin-top: 1rem;
  padding: 10px 24px;
  background: #1C0A00;
  color: #C47A2B;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: 0.3s;
}
.btn-vazio:hover {
  background: #C47A2B;
  color: #1C0A00;
}

ul { list-style: disc; padding-left: 16px; margin: 0; }
li { font-size: 0.85rem; color: #555; }
.divider { height: 4px; }
</style>