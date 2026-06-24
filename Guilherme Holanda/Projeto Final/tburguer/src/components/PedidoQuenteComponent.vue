<template>
  <div>
    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-item-content">
          {{ item && item.nome ? item.nome : "-" }}
        </p>
        <img id="foto-content" :src="item && item.foto ? item.foto : ''" />
      </div>
      <div class="inputs">
        <label for="nome-cliente">Nome</label>
        <input
          type="text"
          v-model="nomeCliente"
          id="nome-cliente"
          name="nome-cliente"
          placeholder="Digite seu Nome"
        />
      </div>
      <div class="inputs">
        <label>Tamanho</label>
        <select name="tamanho" id="tamanho" v-model="tamanhoSelecionado">
          <option value="" selected>Selecione o tamanho</option>
          <option v-for="tamanho in listaTamanhos" :key="tamanho.id" :value="tamanho">
            {{ tamanho.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <label class="secao-titulo"> Personalize sua bebida</label>
        <label id="opcionais-subtitulo"> Selecione os adicionais</label>

        <div
          class="checkbox-container"
          v-for="adicional in listaAdicionais"
          :key="adicional.id"
        >
          <input
            type="checkbox"
            :name="adicional.nome"
            :value="adicional"
            v-model="listaAdicionaisSelecionados"
          />
          <span>{{ adicional.nome }}</span>
        </div>

        <label> Que tal um acompanhamento?</label>

        <div
          class="checkbox-container"
          id="checkbox-container"
          v-for="acompanhamento in listaAcompanhamentos"
          :key="acompanhamento.id"
        >
          <input
            type="checkbox"
            :name="acompanhamento.nome"
            :value="acompanhamento"
            v-model="listaAcompanhamentosSelecionados"
          />
          <span>{{ acompanhamento.nome }}</span>
        </div>

        <alerta-component-vue
          :tipo="alerta.tipo"
          :mensagem="alerta.mensagem"
          :visivel="alerta.visivel"
          @fechar="fecharAlerta"
        />

        <div class="inputs">
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
import AlertaComponentVue from "@/components/AlertaComponent.vue";

export default {
  name: "PedidoQuenteComponent",
  components: {
    AlertaComponentVue,
  },
  props: {
    item: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaAcompanhamentos: [],
      listaAdicionais: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      listaAdicionaisSelecionados: [],
      listaAcompanhamentosSelecionados: [],
      enviando: false,
      alerta: { visivel: false, tipo: "aviso", mensagem: "" },
    };
  },
  methods: {
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tamanhos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const respAdicionais = await fetch(`${this.$apiUrl}/adicionais`);
      this.listaAdicionais = await respAdicionais.json();

      const respAcompanhamentos = await fetch(`${this.$apiUrl}/acompanhamentos`);
      this.listaAcompanhamentos = await respAcompanhamentos.json();
    },
    mostrarAlerta(tipo, mensagem) {
      this.alerta = { visivel: true, tipo: tipo, mensagem: mensagem };
    },
    fecharAlerta() {
      this.alerta.visivel = false;
    },
    validarPedido() {
      if (this.nomeCliente.trim() === "") {
        this.mostrarAlerta("erro", "Informe o nome do cliente para continuar.");
        return false;
      }
      if (this.tamanhoSelecionado === "") {
        this.mostrarAlerta("aviso", "Selecione o tamanho da sua bebida.");
        return false;
      }
      return true;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.validarPedido()) {
        return;
      }

      this.enviando = true;

      const dadosPedido = {
        nome: this.nomeCliente,
        tamanho: this.tamanhoSelecionado,
        adicionais: Array.from(this.listaAdicionaisSelecionados),
        acompanhamentos: Array.from(this.listaAcompanhamentosSelecionados),
        item: this.item,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      this.$router.push({ path: "/pedidos", query: { sucesso: "true" } });
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();
  },
};
</script>
<style scoped></style>
