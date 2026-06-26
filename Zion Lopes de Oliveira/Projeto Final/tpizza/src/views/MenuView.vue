<template>
  <div>
    <h1>Cardapio</h1>
    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="pizza in listaMenuPizzas"
        :key="pizza.id"
      >
        <div id="card-linha">
          <div class="foto-pizza">
            <img :src="pizza.foto" alt="foto da pizza" />
            <div class="card-coluna">
              <p id="nome-content">{{ pizza.nome }}</p>
              <p id="preco-content">R$ {{ pizza.valor }},00</p>
              <p id="descricao-content">{{ pizza.descricao }}</p>
              <button @click="selecionarPizza(pizza)">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaMenuPizzas: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaMenuPizzas = dados.pizzas;
    },
    selecionarPizza(pizzaSelecionada) {
      const param = JSON.stringify(pizzaSelecionada);
      const pizzaJson = encodeURIComponent(param);
      this.$router.push({ path: "/config", query: { pizza: pizzaJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>
<style scoped>
#card-content {
  display: inline-block;
  width: 280px;
  min-height: 350px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px #444;
  position: relative;
  overflow: hidden;
}

.foto-pizza img {
  width: 100%;
  object-fit: cover;
  max-height: 200px;
  border-radius: 10px 0 0;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 700px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -15px grey;
}

#nome-content {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px;
}

#preco-content {
  font-size: 35px;
  text-align: center;
  font-weight: bold;
  color: green;
  margin: 16px;
}

#descricao-content {
  font-size: 16px;
  text-align: left;
  color: gray;
  margin: 16px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

.card-coluna button {
  margin-top: auto;
  padding: 10px;
  background-color: #c0392b;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  width: 80%;
  margin: 20px;
  cursor: pointer;
  transition: 0.5s;
}

.card-coluna button:hover {
  background-color: transparent;
  color: #c0392b;
  border-radius: 8px;
  border: solid 1px #c0392b;
}
</style>
