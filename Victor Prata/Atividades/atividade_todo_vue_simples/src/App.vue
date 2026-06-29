<template>
  <div class="container">
    <h1>Lista de Tarefas</h1>

    <!-- v-model no input e @click no botão -->
    <div class="form">
      <input type="text" v-model="novaTarefa" placeholder="Digite a tarefa" />
      <button @click="adicionarTarefa">Adicionar</button>
    </div>

    <!-- v-for obrigatório -->
    <ul>
      <li v-for="(tarefa, index) in tarefas" :key="index">
        <input type="checkbox" v-model="tarefa.concluida" />
        <span :class="{ concluida: tarefa.concluida }">{{ tarefa.texto }}</span>
        <button @click="removerTarefa(index)">Remover</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      novaTarefa: '',
      tarefas: []
    }
  },
  methods: {
    adicionarTarefa() {
      if (this.novaTarefa === '') return
      this.tarefas.push({
        texto: this.novaTarefa,
        concluida: false
      })
      this.novaTarefa = ''
    },
    removerTarefa(index) {
      this.tarefas.splice(index, 1)
    }
  }
}
</script>

<style>
.container {
  max-width: 500px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
}

button {
  padding: 8px 15px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

li span {
  flex: 1;
}

.concluida {
  text-decoration: line-through;
  color: gray;
}
</style>
