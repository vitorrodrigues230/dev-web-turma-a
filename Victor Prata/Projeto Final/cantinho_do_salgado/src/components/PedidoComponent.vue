<template>
  <div>
    <form id="pedido-form" @submit.prevent="createPedido">
      <div>
        <p id="nome-hamburguer-content">
          {{ salgado && salgado.nome ? salgado.nome : "-" }}
        </p>
        <img
          id="foto-content"
          :src="salgado && salgado.foto ? salgado.foto : ''"
        />
      </div>
      <div class="inputs" id="form-pedido">
        <label for="nome-cliente">Nome</label>
        <input
          type="text"
          id="nome-cliente"
          name="nome-cliente"
          placeholder="Digite seu Nome"
          v-model="nomeCliente"
        />
      </div>
      <div class="inputs">
        <label id="opcionais-subtitulo"> Selecione os complementos</label>

        <div
          class="checkbox-container"
          v-for="complemento in listaComplementos"
          :key="complemento.id"
        >
          <input
            type="checkbox"
            :name="complemento.nome"
            :value="complemento"
            v-model="complementosSelecionados"
          />
          <span>{{ complemento.nome }}</span>
        </div>

        <label> Adicione uma bebida</label>

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
            v-model="bebidasSelecionadas"
          />
          <span>{{ bebida.nome }}</span>
        </div>
        <div class="inputs">
          <div v-if="msg" :class="['alerta', msg.tipo]">
            <span class="alerta-icone">{{ iconeAlerta(msg.tipo) }}</span>
            {{ msg.texto }}
          </div>
          <input type="submit" class="submit-btn" value="Confirmar Pedido" />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "PedidoComponent",
  props: {
    salgado: null,
  },
  data() {
    return {
      nomeCliente: "",
      complementosSelecionados: [],
      bebidasSelecionadas: [],
      listaBebidas: [],
      listaComplementos: [],
      msg: null,
    };
  },
  methods: {
    async getOpcionais() {
      const response = await fetch("http://localhost:3000/opcionais");
      const dados = await response.json();
      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },
    iconeAlerta(tipo) {
      const icones = { sucesso: "✔", erro: "✖", aviso: "⚠", info: "ℹ" };
      return icones[tipo] || "";
    },
    async createPedido() {
      if (!this.nomeCliente) {
        this.msg = { texto: "Por favor, informe seu nome!", tipo: "aviso" };
        return;
      }
      if (!this.salgado) {
        this.msg = { texto: "Nenhum salgado selecionado!", tipo: "erro" };
        return;
      }
      const pedido = {
        nome: this.nomeCliente,
        salgado: this.salgado,
        complementos: this.complementosSelecionados,
        bebidas: this.bebidasSelecionadas,
        statusId: 1,
      };
      try {
        const response = await fetch("http://localhost:3000/pedidos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pedido),
        });
        if (response.ok) {
          this.msg = { texto: "Pedido realizado com sucesso!", tipo: "sucesso" };
          setTimeout(() => {
            this.$router.push("/pedidos");
          }, 2000);
        } else {
          this.msg = {
            texto: "Erro ao realizar o pedido. Tente novamente.",
            tipo: "erro",
          };
        }
      } catch (e) {
        this.msg = { texto: "Erro de conexão com o servidor!", tipo: "erro" };
      }
    },
  },
  mounted() {
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
  border-left: 4px solid darkgoldenrod;
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
  background-color: #222;
  color: darkgoldenrod;
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
  background-color: darkgoldenrod;
  color: #222;
}

.alerta {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
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
