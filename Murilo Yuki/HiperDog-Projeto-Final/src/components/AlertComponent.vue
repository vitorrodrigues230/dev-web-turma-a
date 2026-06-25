<template>
  <div class="alerta-container" v-if="mensagem">
    <div :class="['alerta', tipoAlerta]">
      {{ mensagem }}
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertComponent",
  props: {
    mensagem: String,
    tipoAlerta: {
      type: String,
      default: "info"
    }
  }
};
</script>

<style scoped>
.alerta-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.alerta {
  padding: 15px 20px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  width: 100%;
  max-width: 600px;
}
.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.info {
  background-color: #cce5ff;
  color: #004085;
  border: 1px solid #b8daff;
}
</style>