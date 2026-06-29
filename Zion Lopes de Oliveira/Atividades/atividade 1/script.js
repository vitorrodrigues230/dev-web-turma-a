const { createApp, ref } = Vue;

createApp({
  setup() {

    const novaTarefa = ref("");
    const tarefas = ref([]);

    function adicionarTarefa() {
      const texto = novaTarefa.value.trim();
      if (!texto) return;

      tarefas.value.push({
        id: Date.now(),
        texto: texto,
        concluida: false
      });

      novaTarefa.value = "";
    }

    function toggleConcluida(tarefa) {
      tarefa.concluida = !tarefa.concluida;
    }

    function removerTarefa(id) {
      tarefas.value = tarefas.value.filter(t => t.id !== id);
    }

    return { novaTarefa, tarefas, adicionarTarefa, toggleConcluida, removerTarefa };
  }
}).mount("#app");