<template>
  <div v-if="visivel" :class="['alerta', 'alerta-' + tipo]">
    <span class="alerta-icone">{{ obterIcone() }}</span>
    <span class="alerta-mensagem">{{ mensagem }}</span>
    <button type="button" class="alerta-fechar" @click="fecharAlerta">X</button>
  </div>
</template>
<script>
export default {
  name: "AlertaComponent",
  props: {
    tipo: { type: String, default: "aviso" },
    mensagem: { type: String, default: "" },
    visivel: { type: Boolean, default: false },
  },
  emits: ["fechar"],
  methods: {
    obterIcone() {
      const icones = { erro: "✕", aviso: "⚠", sucesso: "✓" };
      return icones[this.tipo] || "⚠";
    },
    fecharAlerta() {
      this.$emit("fechar");
    },
  },
};
</script>
<style scoped>
.alerta {
  display: flex;
  align-items: center;
  max-width: 750px;
  margin: 0 auto 20px auto;
  padding: 14px 16px;
  border-radius: 8px;
  border-left: 6px solid;
  font-weight: bold;
}

.alerta-icone {
  font-size: 18px;
  margin-right: 12px;
}

.alerta-mensagem {
  flex: 1;
  text-align: left;
}

.alerta-fechar {
  background: transparent;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  color: inherit;
  margin-left: 12px;
}

.alerta-erro {
  background: #fdecea;
  color: #b71c1c;
  border-color: #c62828;
}

.alerta-aviso {
  background: #fff4e5;
  color: #9c4d00;
  border-color: #ef6c00;
}

.alerta-sucesso {
  background: #e9f7ef;
  color: #1b5e20;
  border-color: #2e7d32;
}
</style>
