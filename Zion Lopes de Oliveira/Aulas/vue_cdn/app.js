const meuAppValue = {
    data() {
        return {
            nome: "Paulo",
            idade : 47,
            inputText : ""
        };
    },
};

Vue.createApp(meuAppValue).mount("#app");
