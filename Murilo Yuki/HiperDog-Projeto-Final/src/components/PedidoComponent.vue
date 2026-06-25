<template>
  <div>
    <AlertComponent :mensagem="mensagemAlerta" :tipoAlerta="tipoAlerta" />

    <form id="pedido-form" @submit="criarPedido($event)">
      <div>
        <p id="nome-hotdog-content">
          {{ hotdog && hotdog.nome ? hotdog.nome : "-" }}
        </p>
        <img
          id="foto-content"
          :src="hotdog && hotdog.foto ? hotdog.foto : ''"
        />
      </div>
      
      <div id="form-pedido">
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
          <label>Tipo de Salsicha</label>
          <select
            name="tipo-salsicha"
            id="tipo-salsicha"
            v-model="tipoSalsichaSelecionado"
          >
            <option value="" selected>Selecione a Salsicha</option>
            <option
              v-for="tipoSalsicha in listaTipoSalsicha"
              :key="tipoSalsicha.id"
              :value="tipoSalsicha"
            >
              {{ tipoSalsicha.descricao }}
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

          <label id="opcionais-subtitulo"> Adicione uma bebida</label>

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
          
          <div class="inputs">
            <input type="submit" class="submit-btn" value="Confirmar Pedido" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AlertComponent from "@/components/AlertComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    AlertComponent,
  },
  props: {
    hotdog: null,
  },
  data() {
    return {
      listaTipoSalsicha: [],
      listaBebidas: [],
      listaComplementos: [],
      nomeCliente: "",
      tipoSalsichaSelecionado: "",
      listaComplementosSelecionados: [],
      listaBebidasSelecionadas: [],
      mensagemAlerta: "",
      tipoAlerta: ""
    };
  },
  methods: {
    async getTipoSalsicha() {
      const response = await fetch("https://api-tburguer-1.onrender.com/tipos_salsicha");
      const dados = await response.json();
      this.listaTipoSalsicha = dados;
    },
    async getOpcionais() {
      const response = await fetch("https://api-tburguer-1.onrender.com/opcionais");
      const dados = await response.json();
      this.listaComplementos = dados.complemento;
      this.listaBebidas = dados.bebidas;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.nomeCliente || !this.tipoSalsichaSelecionado) {
        this.mensagemAlerta = "Atenção: Preencha o seu nome e escolha a salsicha antes de confirmar!";
        this.tipoAlerta = "error"; 
        
        setTimeout(() => {
          this.mensagemAlerta = "";
        }, 4000);
        return; 
      }

      const dadosPedido = {
        nome: this.nomeCliente,
        salsicha: this.tipoSalsichaSelecionado,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        complemento: Array.from(this.listaComplementosSelecionados),
        hotdog: this.hotdog,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      await fetch("https://api-tburguer-1.onrender.com/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      this.mensagemAlerta = `O pedido do hot-dog ${this.hotdog.nome} foi realizado com sucesso!`;
      this.tipoAlerta = "success"; 

      setTimeout(() => {
        this.$router.push({ name: "pedidos" });
      }, 2500);
    },
  },
  mounted() {
    this.getTipoSalsicha();
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

#nome-hotdog-content{
  font-size: 43px;
  font-weight: bold;
  text-align: start;
  margin-bottom: -90px;
  margin-left: 40px;
  color: rgb(85, 48, 2);
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
  display: flex;
  align-items: center;
  border-left: 4px solid #c0392b;
}

#opcionais-subtitulo {
  margin-top: 15px;
}

input[type="text"],
select {
  padding: 12px;
  width: 300px;
  border: solid #222 1px;
  border-radius: 8px;
  font-size: 14px;
}

.checkbox-container {
  display: flex;
  align-items: center; 
  margin-bottom: 10px;
}

.checkbox-container span {
  margin-left: 10px;
  font-weight: bold;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.submit-btn {
  background-color: #222;
  color: #fff;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 20px auto 0 auto;
  cursor: pointer;
  width: 100%;
  transition: 0.5s;
}
</style>