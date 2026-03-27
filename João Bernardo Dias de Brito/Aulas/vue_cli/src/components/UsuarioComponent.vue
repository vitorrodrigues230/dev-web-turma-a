<template>
    <div>
        <p>Nome: {{ nome }}</p>
        <p>Email:{{ email }}</p>
        <hr />
        <h1 v-show="isBrasaCampeao">Brasil Campeão</h1>
        <img :src="urlImg" width="300" height="200" />
    </div>
</template>

<script>

 export default{
    name:"UsuarioComponent",
    data(){
        return{
            nome:"João Bernardo",
            email:"Bernardinho@gmail.com",
            isBrasaCampeao: false,
            urlImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CtDmloIwee-AXHP0OOFbpnWmyd5plbAwWA&s",
        };
    },
    mounted(){
       setTimeout(() => {
        this.isBrasaCampeao = true;
       }, 4 * 1000);

       setTimeout(() => {
        this.isBrasaCampeao = false; 
        this.urlImg = "https://imagem.natelinha.uol.com.br/original/bbb21-juliette-chora_3121.jpeg";
       }, 8 * 1000);

    },
 };

</script>



<style>

</style>