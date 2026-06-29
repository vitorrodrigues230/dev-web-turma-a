window.onload = function() {

    const input = this.document.getElementById("tarefaInput");
    const btnAdicionar = this.document.getElementById("btnAdicionar");
    const lista = this.document.getElementById("listaTarefas");

    //Recupera o valor do Input Text
    btnAdicionar.addEventListener("click", () => {

        const texto = input.value.trim();

        // Cria elemento na lista de tarefas
        const li = this.document.createElement("li");

        //Adicionar o valor do input do item da lista
        li.textContent = texto;

        //Adicionando click para "Riscar" a tarefa
        li.addEventListener("click", () => {

            li.classList.toggle("concluida");

        })

        //Criação do Botão
        const btnRemover = this.document.createElement("button");
        btnRemover.textContent = "X"
        //add a classe de estilo do botão fechar
        btnRemover.classList.add("fechar")
        btnRemover.addEventListener("click", () => {
            li.remove();
            
        });

        //Adicionando o botão X na LI
        li.appendChild(btnRemover);

        //Adicionar o item na lista para ser apresentado
        lista.appendChild(li);

        input.value = "";

        

    });
}