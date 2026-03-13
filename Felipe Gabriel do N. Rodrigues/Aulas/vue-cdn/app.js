const meuAppVue = {
    data() {
        return {
            nome: "Felipe Rodrigues",
            idade: 19,
            inputText: "",
        };
    },
};

Vue.createApp(meuAppVue).mount("#app");