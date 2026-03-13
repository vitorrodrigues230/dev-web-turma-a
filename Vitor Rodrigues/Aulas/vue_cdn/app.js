const meuAppVue = {
    data() {
        return {
            nome: "Vitor",
            idade: 18,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");