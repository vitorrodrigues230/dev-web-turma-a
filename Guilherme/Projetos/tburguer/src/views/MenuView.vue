<template>
  <div>
    <h1>Cardápio</h1>

    <div v-if="listaMenuCafes.length === 0" id="loading">
      <p>☕ Carregando cardápio…</p>
    </div>

    <div id="scroll-horizontal">
      <div
        id="card-content"
        v-for="cafe in listaMenuCafes"
        :key="cafe.id"
      >
        <div id="card-linha">
          <div class="foto-cafe">
            <img :src="cafe.foto" :alt="cafe.nome" />
            <div class="card-coluna">
              <p id="nome-content">{{ cafe.nome }}</p>
              <p id="preco-content">R$ {{ cafe.valor.toFixed(2) }}</p>
              <p id="descricao-content">{{ cafe.descricao }}</p>
              <span v-if="cafe.eh_novidade" class="badge-novidade">Novidade ✨</span>
              <button @click="selecionarCafe(cafe)">Selecionar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API = process.env.VUE_APP_API_BASE_URL || "http://localhost:3000";

export default {
  name: "MenuView",
  data() {
    return {
      listaMenuCafes: [],
    };
  },
  methods: {
    async consultarMenu() {
      try {
        const response = await fetch(`${API}/menu`);
        const dados = await response.json();
        // Junta especiais + cafés regulares numa lista só
        this.listaMenuCafes = [
          ...(dados.especiais || []),
          ...(dados.cafes    || []),
        ];
      } catch {
        console.error("Erro ao carregar o cardápio.");
      }
    },
    selecionarCafe(cafeSelecionado) {
      const param = JSON.stringify(cafeSelecionado);
      const cafeJson = encodeURIComponent(param);
      this.$router.push({ path: "/config", query: { cafe: cafeJson } });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin: 24px 0 16px;
  font-family: Georgia, serif;
  color: #1C0A00;
}

#loading {
  text-align: center;
  padding: 2rem;
  color: #888;
}

#card-content {
  display: inline-block;
  width: 280px;
  min-height: 500px;
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px #444;
  position: relative;
  overflow: hidden;
}

#scroll-horizontal {
  flex: 1;
  overflow-x: auto;
  white-space: nowrap;
  width: 700px;
  margin: 0 auto;
  box-shadow: inset -10px 0px 15px -15px grey;
}

.foto-cafe img {
  width: 100%;
  object-fit: cover;
  max-height: 200px;
  border-radius: 10px 0 0;
}

#nome-content {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin: 12px 0;
  white-space: normal;
  color: #1C0A00;
}

#preco-content {
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: #C47A2B;
  margin: 8px 16px;
}

#descricao-content {
  font-size: 14px;
  text-align: left;
  color: gray;
  margin: 8px 16px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

.badge-novidade {
  display: inline-block;
  background: #C47A2B;
  color: #1C0A00;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 2px 10px;
  border-radius: 20px;
  margin-left: 16px;
  margin-bottom: 6px;
}

.card-coluna button {
  padding: 10px;
  background-color: #1C0A00;
  color: #C47A2B;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  width: 80%;
  margin: 12px 16px;
  cursor: pointer;
  transition: 0.4s;
}

.card-coluna button:hover {
  background-color: #C47A2B;
  color: #1C0A00;
  border: solid 1px #1C0A00;
}
</style>