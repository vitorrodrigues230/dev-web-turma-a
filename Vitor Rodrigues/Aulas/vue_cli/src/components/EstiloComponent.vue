<template>
    <div>
        <h1>Titulo do Componente</h1>
        <p class="subtitulo">Subtitulo do Componente</p>
    </div>
</template>

<script>
    export default {
        name: "EstiloComponent",
    };
</script>

<style scopet>
    h1 {
        color: greenyellow;
    }
    .subtitulo {
        font-family: "Times New Roman";
        text-align: left;
        color: darkred;
    }
</style>