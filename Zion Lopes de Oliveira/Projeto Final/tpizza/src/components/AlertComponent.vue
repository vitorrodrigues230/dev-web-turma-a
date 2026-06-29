<template>
  <div :class="['alerta', tipo, classeVisibilidade]" @click="fechar">
    <span class="alerta-icone">{{ icone }}</span>
    <span class="alerta-msg">{{ mensagem }}</span>
    <span class="alerta-fechar">X</span>
  </div>
</template>
<script>
export default {
  name: "AlertComponent",
  props: {
    tipo: {
      type: String,
      default: "info",
    },
    mensagem: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visivel: true,
    };
  },
  computed: {
    icone() {
      const icones = {
        erro: "[ERRO]",
        aviso: "[AVISO]",
        info: "[INFO]",
        sucesso: "[OK]",
      };
      return icones[this.tipo] || "[INFO]";
    },
    classeVisibilidade() {
      if (!this.mensagem || !this.visivel) {
        return "alerta-escondido";
      }
      return "";
    },
  },
  methods: {
    fechar() {
      this.visivel = false;
      this.$emit("fechar");
    },
  },
  watch: {
    mensagem() {
      this.visivel = true;
    },
  },
};
</script>
<style scoped>
.alerta {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 10px 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

.alerta-escondido {
  display: none;
}

.alerta-icone {
  margin-right: 10px;
  font-size: 13px;
}

.alerta-msg {
  flex: 1;
}

.alerta-fechar {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
}

.erro {
  background-color: #fde8e8;
  color: #c0392b;
  border: 1px solid #c0392b;
}

.aviso {
  background-color: #fef3e2;
  color: #e67e22;
  border: 1px solid #e67e22;
}

.info {
  background-color: #e8f0fe;
  color: #2980b9;
  border: 1px solid #2980b9;
}

.sucesso {
  background-color: #e8f8e8;
  color: #27ae60;
  border: 1px solid #27ae60;
}
</style>
