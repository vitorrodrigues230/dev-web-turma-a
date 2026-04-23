const { createApp } = Vue;

createApp({
  data() {
    return {
      novaTarefa: '',
      tarefas: []
    }
  },
  methods: {
    adicionarTarefa() {
      if (this.novaTarefa.trim() !== "") {
        this.tarefas.push({
          texto: this.novaTarefa,
          concluida: false
        });
        this.novaTarefa = "";
      }
    },
    alternarTarefa(index) {
      this.tarefas[index].concluida = !this.tarefas[index].concluida;
    },
    removerTarefa(index) {
      this.tarefas.splice(index, 1);
    }
  }
}).mount('#app');