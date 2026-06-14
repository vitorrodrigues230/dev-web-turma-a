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

    <form id="pedido-form" @submit="criarPedido($event)">
      <!-- Foto e nome do café selecionado -->
      <div>
        <p id="nome-hamburguer-content">
          {{ cafe && cafe.nome ? cafe.nome : "-" }}
        </p>
        <img
          id="foto-content"
          :src="cafe && cafe.foto ? cafe.foto : ''"
          :alt="cafe && cafe.nome ? cafe.nome : 'Café'"
        />
      </div>

      <!-- Nome do cliente -->
      <div class="inputs">
        <label for="nome-cliente">Nome do cliente *</label>
        <input
          type="text"
          v-model="nomeCliente"
          id="nome-cliente"
          name="nome-cliente"
          placeholder="Digite seu nome"
          :class="{ 'input-erro': erros.nome }"
        />
        <span v-if="erros.nome" class="campo-erro">{{ erros.nome }}</span>
      </div>

      <!-- Tamanho (substitui "Ponto da Carne") -->
      <div class="inputs">
        <label>Tamanho *</label>
        <select
          name="tamanho"
          id="tamanho"
          v-model="tamanhoSelecionado"
          :class="{ 'input-erro': erros.tamanho }"
        >
          <option value="" selected>Selecione o tamanho</option>
          <option
            v-for="tamanho in listaTamanhos"
            :key="tamanho.id"
            :value="tamanho"
          >
            {{ tamanho.descricao }}
          </option>
        </select>
        <span v-if="erros.tamanho" class="campo-erro">{{ erros.tamanho }}</span>
      </div>

      <!-- Acompanhamentos (substitui "Complementos") -->
      <div class="inputs">
        <label id="opcionais-titulo">Selecione os opcionais</label>
        <label id="opcionais-subtitulo">Acompanhamentos</label>

        <div
          class="checkbox-container"
          v-for="acomp in listaAcompanhamentos"
          :key="acomp.id"
        >
          <input
            type="checkbox"
            :name="acomp.nome"
            :value="acomp"
            v-model="listaAcompanhamentosSelecionados"
          />
          <span>{{ acomp.nome }}</span>
        </div>

        <label>Adicione uma bebida</label>

        <div
          class="checkbox-container"
          v-for="bebida in listaBebidas"
          :key="bebida.id"
        >
          <input
            type="checkbox"
            :name="bebida.nome"
            :value="bebida"
            v-model="listaBebidasSelecionadas"
          />
          <span>{{ bebida.nome }}</span>
        </div>

        <div class="inputs" style="margin-top: 16px;">
          <input
            type="submit"
            class="submit-btn"
            value="Confirmar Pedido"
            :disabled="enviando"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AlertaComponent from "@/components/AlertaComponent.vue";

const API = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
  name: "PedidoComponent",
  components: { AlertaComponent },
  props: {
    cafe: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaBebidas: [],
      listaAcompanhamentos: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaAcompanhamentosSelecionados: [],
      listaBebidasSelecionadas: [],
      erros: { nome: "", tamanho: "" },
      alerta: { tipo: "info", mensagem: "", duracao: 4000 },
      enviando: false,
    };
  },
  methods: {
    async getTamanhos() {
      const response = await fetch(`${API}/tipos_tamanho`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${API}/opcionais`);
      const dados = await response.json();
      this.listaAcompanhamentos = dados.acompanhamentos;
      this.listaBebidas = dados.bebidas;
    },

    validar() {
      let valido = true;
      this.erros = { nome: "", tamanho: "" };

      if (!this.nomeCliente.trim()) {
        this.erros.nome = "Informe o seu nome.";
        valido = false;
      }
      if (!this.tamanhoSelecionado) {
        this.erros.tamanho = "Selecione o tamanho.";
        valido = false;
      }
      if (!valido) {
        this.exibirAlerta("erro", "Preencha os campos obrigatórios antes de confirmar.");
      }
      return valido;
    },

    async criarPedido(e) {
      e.preventDefault();

      if (!this.validar()) return;

      this.enviando = true;

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        acompanhamentos: Array.from(this.listaAcompanhamentosSelecionados),
        cafe: this.cafe,
        statusId: 6,
      };

      try {
        const req = await fetch(`${API}/pedidos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPedido),
        });

        if (!req.ok) throw new Error();

        this.exibirAlerta("sucesso", "Pedido realizado com sucesso! Redirecionando…", 2500);

        setTimeout(() => {
          this.$router.push({ path: "/pedidos" });
        }, 2600);

      } catch {
        this.exibirAlerta("erro", "Erro ao enviar o pedido. Tente novamente.");
      } finally {
        this.enviando = false;
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
    this.getTamanhos();
    this.getOpcionais();
  },
};
</script>

<style scoped>
#foto-content {
  margin-bottom: 16px;
  border-radius: 16px;
  position: relative;
  z-index: -1;
  justify-content: center;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-hamburguer-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  padding: 16px;
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin-bottom: 16px;
  color: #222;
  padding: 5px 12px;
  flex-direction: start;
  display: flex;
  border-left: 4px solid #C47A2B;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 40px;
  font-size: 12px;
}

select { height: 45px; }

.input-erro { border-color: #D64045 !important; }

.campo-erro {
  color: #D64045;
  font-size: 0.82rem;
  margin-top: 4px;
  font-weight: 600;
}

#opcionais-titulo { width: 100%; }

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span { margin-left: 6px; font-weight: bold; }
.checkbox-container span,
.checkbox-container input { width: auto; height: 20px; }

.submit-btn {
  background-color: #1C0A00;
  color: #C47A2B;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}
.submit-btn:hover {
  background-color: #C47A2B;
  color: #1C0A00;
}
.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>