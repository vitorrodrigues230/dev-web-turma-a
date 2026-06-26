<template>
  <div>
    <alert-component
      :tipo="alerta.tipo"
      :mensagem="alerta.mensagem"
      @fechar="alerta.mensagem = ''"
    />
    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-pizza-content">
          {{ pizza && pizza.nome ? pizza.nome : "-" }}
        </p>
        <img
          id="foto-content"
          :src="pizza && pizza.foto ? pizza.foto : ''"
        />
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
        <label>Tipo da massa</label>
        <select
          name="tipo-massa"
          id="tipo-massa"
          v-model="tipoMassaSelecionado"
        >
          <option value="" selected>Selecione a massa</option>
          <option
            v-for="massa in listaTiposMassa"
            :key="massa.id"
            :value="massa"
          >
            {{ massa.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <label id="opcionais-titulo">Selecione os opcionais</label>
        <label id="opcionais-subtitulo">Adicionais para sua pizza</label>

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

        <label>Adicione uma bebida</label>

        <div
          class="checkbox-container"
          id="checkbox-container"
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
        <div class="inputs">
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AlertComponent from "./AlertComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    AlertComponent,
  },
  props: {
    pizza: null,
  },
  data() {
    return {
      listaTiposMassa: [],
      listaBebidas: [],
      listaAdicionais: [],
      nomeCliente: "",
      tipoMassaSelecionado: "",
      listaAdicionaisSelecionados: [],
      listaBebidasSelecionadas: [],
      alerta: { tipo: "", mensagem: "" },
    };
  },
  methods: {
    async getTiposMassa() {
      const response = await fetch(`${this.$apiUrl}/tipos_massa`);
      const dados = await response.json();
      this.listaTiposMassa = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaAdicionais = dados.adicionais;
      this.listaBebidas = dados.bebidas;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente.trim()) {
        this.alerta = { tipo: "erro", mensagem: "Preencha o campo Nome." };
        return;
      }

      if (!this.tipoMassaSelecionado) {
        this.alerta = { tipo: "erro", mensagem: "Selecione o tipo da massa." };
        return;
      }

      if (!this.pizza) {
        this.alerta = { tipo: "aviso", mensagem: "Nenhuma pizza foi selecionada. Volte ao cardapio." };
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        massa: this.tipoMassaSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        adicionais: Array.from(this.listaAdicionaisSelecionados),
        pizza: this.pizza,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      const req = await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      if (req.ok) {
        this.alerta = { tipo: "sucesso", mensagem: "Pedido realizado com sucesso!" };
        this.nomeCliente = "";
        this.tipoMassaSelecionado = "";
        this.listaAdicionaisSelecionados = [];
        this.listaBebidasSelecionadas = [];
      } else {
        this.alerta = { tipo: "erro", mensagem: "Erro ao realizar o pedido. Tente novamente." };
      }
    },
  },
  mounted() {
    this.getTiposMassa();
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

#nome-pizza-content {
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: antiquewhite;
  -webkit-text-stroke: 2px #1a1a2e;
  padding: 16px;
}

#form-pedido {
  max-width: 750px;
  margin: 0 auto;
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
  border-left: 4px solid #c0392b;
}

input,
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  height: 20px;
  font-size: 12px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: flex;
  align-items: flex-start;
  align-content: center;
  width: 100%;
  margin-bottom: 12px;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
  height: 20px;
}

.submit-btn {
  background-color: #1a1a2e;
  color: #e74c3c;
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
  background-color: #c0392b;
  color: #f5f5f5;
}
</style>
