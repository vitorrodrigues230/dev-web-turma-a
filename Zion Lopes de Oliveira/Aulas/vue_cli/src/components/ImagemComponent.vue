<template>
    <div>
        <img 
        v-show="isImgVisivel" 
        :src="urlImg"
        :width="larguraImg"
        />
        <br/>
        <button @click="apareceEsconde(), trocaLabel()">{{ nomeBotao }}</button>
    </div>
</template>


<script>
 
    export default {
        name: "ImagemComponent",
        data() {
            return{
                isImgVisivel: false,
                nomeBotao: "Aparecer",
            };
        },
        methods: {
            apareceEsconde(){
                this.isImgVisivel = !this.isImgVisivel;
                this.$emit("visibilidadeImg", this.isImgVisive);
            },
            trocaLabel(){
                if(this.isImgVisivel){
                    this.nomeBotao = "Esconder";
                }else {
                    this.nomeBotao = "Aparecer";
                }
            },
        },
        props :{
            urlImg: String,
            larguraImg: Number,
        },
        emits: ["visibilidadeImg"]
    };

</script>




<style scoped>
    img{
        border: 10px solid darkblue;
        border-radius: 9e9px;
    }
</style>
