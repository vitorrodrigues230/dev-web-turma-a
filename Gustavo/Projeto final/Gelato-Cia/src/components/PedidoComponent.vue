<template>
  <div>
    <form id="pedido-form" @submit="criarPedido($event)">
      <div
      v-if="alertaVisivel"
      class="alerta"
      :class="alertaTipo"
>
      <span class="alerta-icone">
        <span v-if="alertaTipo === 'erro'">❌</span>
        <span v-if="alertaTipo === 'aviso'">⚠️</span>
        <span v-if="alertaTipo === 'info'">ℹ️</span>
        <span v-if="alertaTipo === 'sucesso'">✅</span>
      </span>
      <span>{{ alertaMensagem }}</span>
       </div>
      <div>
        <p id="nome-hamburguer-content">
          {{ burguer && burguer.nome ? burguer.nome : "-" }}
        </p>
        <img
          id="foto-content"
          :src="burguer && burguer.foto ? burguer.foto : ''"
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
        <label>Tamanho</label>
        <select
          name="ponto-carne"
          id="ponto-carne"
          v-model="pontoCarneSelecionado"
        >
          <option value="" selected>Selecione o Tamanho</option>
          <option
            v-for="pontoCarne in listaPontoCarne"
            :key="pontoCarne.id"
            :value="pontoCarne"
          >
            {{ pontoCarne.descricao }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <label id="opcionais-titulo"> Selecione os opcionais</label>
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
            v-model="listaComplementosSelecionados"
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
export default {
  name: "PedidoComponent",
  props: {
    burguer: null,
  },
  data() {
    return {
      listaPontoCarne: [],
      listaBebidas: [],
      listaComplementos: [],
      nomeCliente: "",
      pontoCarneSelecionado: "",
      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],
      alertaVisivel: false,
      alertaTipo: "",
      alertaMensagem: "",
    };
  },
  methods: {
    async getTipoPontos() {
      const response = await fetch(`${this.$apiUrl}/tipos_pontos`);
      const dados = await response.json();
      this.listaPontoCarne = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },
     mostrarAlerta(tipo, mensagem) {
      this.alertaTipo = tipo;
      this.alertaMensagem = mensagem;
      this.alertaVisivel = true;

     setTimeout(() => {
      this.alertaVisivel = false;
     }, 3000);
    },

    async criarPedido(e) {
      e.preventDefault();

      if (this.nomeCliente.trim() === "") {
       this.mostrarAlerta("erro", "Por favor, preencha o seu nome.");  
       return; 
      }
      if (this.pontoCarneSelecionado === "") {
       this.mostrarAlerta("erro", "Por favor, selecione o tamanho.");
       return; 
      }
      const dadosPedido = {
        nome: this.nomeCliente,
        ponto: this.pontoCarneSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        burguer: this.burguer,
        statusId: 5,
      };

      console.log(dadosPedido);

      const dadosJson = JSON.stringify(dadosPedido);

      const req = await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });  
      this.mostrarAlerta("sucesso", "Pedido realizado com sucesso!");
      setTimeout(() => {
       this.$router.push("/pedidos");
      }, 1500);
    },
  },
  mounted() {
    this.getTipoPontos();
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
  padding: 15px 20px;
  border-radius: 8px;
  margin: 15px auto;
  width: 80%;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
}
.alerta-icone {
  font-size: 20px;
}
.alerta.erro {
  background-color: #e74c3c; 
}
.alerta.aviso {
  background-color: #e67e22; 
}
.alerta.info {
  background-color: #3498db;
}
.alerta.sucesso {
  background-color: #2ecc71; 
}
</style>
