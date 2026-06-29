const meuAppVue = {
    data() {
        return{
            nome: "Victor Prata",
            idade: 19,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");
