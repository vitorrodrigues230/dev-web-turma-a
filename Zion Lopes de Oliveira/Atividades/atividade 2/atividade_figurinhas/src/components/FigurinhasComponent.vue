<template>
  <div class="container">
    <h1>Álbum de Figurinhas</h1>

    <select v-model="paisSelecionado" @change="carregarFigurinhas">
      <option value="">Selecione um país</option>
      <option v-for="pais in paises" :key="pais.name" :value="pais.name">
        {{ pais.name }}
      </option>
    </select>

    <p v-if="carregando">Carregando...</p>

    <div class="cards">
      <div class="card" v-for="jogador in jogadores" :key="jogador.id">
        <img :src="'https://media.api-sports.io/football/players/' + jogador.id + '.png'" :alt="jogador.name" />
        <h3>{{ jogador.name }}</h3>
        <p>{{ traduzir(jogador.position) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const token = '779ce1a75256f3602aed80e8e73c41c5'

export default {
  data() {
    return {
      paises: [],
      paisSelecionado: '',
      jogadores: [],
      carregando: false
    }
  },
  methods: {
    traduzir(posicao) {
      const posicoes = {
        Goalkeeper: 'Goleiro',
        Defender: 'Defensor',
        Midfielder: 'Meio-campista',
        Attacker: 'Atacante'
      }
      return posicoes[posicao] || posicao
    },
    async carregarPaises() {
      const response = await fetch('https://v3.football.api-sports.io/teams/countries', {
        method: 'GET',
        headers: { 'x-apisports-key': token }
      })
      const dados = await response.json()
      this.paises = dados.response
    },
    async carregarFigurinhas() {
      if (!this.paisSelecionado) return
      this.carregando = true
      this.jogadores = []

      const responseTime = await fetch('https://v3.football.api-sports.io/teams?name=' + this.paisSelecionado, {
        method: 'GET',
        headers: { 'x-apisports-key': token }
      })
      const dadosTime = await responseTime.json()
      const teamId = dadosTime.response[0].team.id

      const responseElenco = await fetch('https://v3.football.api-sports.io/players/squads?team=' + teamId, {
        method: 'GET',
        headers: { 'x-apisports-key': token }
      })
      const dadosElenco = await responseElenco.json()
      this.jogadores = dadosElenco.response[0].players

      this.carregando = false
    }
  },
  mounted() {
    this.carregarPaises()
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
select {
  padding: 8px;
  margin-bottom: 20px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}
.card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
