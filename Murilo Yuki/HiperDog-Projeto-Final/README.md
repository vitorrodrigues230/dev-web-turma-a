# Projeto Final HiperDog (Base utilizada do Tburguer)
## Visão Geral 
O projeto HiperDog vem como uma forma de facilitar a compra de cachorro quente para os clientes que necessitam de um sabor de qualidade. Dentro do projeto ouve mudanças dentro do seu banner que foi adicionado ao tema junto com uma nova logo para representar marca, além de mudanças dentro do programa, no qual foram trocadas pelo nome "hotdog" ao invez de "tburguer" ou "burguer", além de outras mudanças como a remoção do ponto da carne para tipos de salsicha, adição de novos complementos como batata palha e bacon em cubos e entre outras mudanças.
## Solução técnica dos alertas
Os alertas foram feitos a partir de um novo arquivo component com o nome "AlertComponent", e ele funciona da seguinte forma, o componente recebe duas propos cruciais do component pai: mensagem e tipo de alerta, e através da diretiva :class="['alerta', tipoAlerta]", o vue injeta dinamicamente a classe CSS correspondente, alterando cores de fundo e borda do alerta de acrodo com status da operação, e a diretiva v-if="mensagem" garante que a caixa de alerta só exista no DOM caso haja uma mensagem válida para uma exibição.
## Links do Projeto 
* Link da API:[https:https://api-tburguer-1.onrender.com](https://api-tburguer-1.onrender.com/)
* Link do Site HiperDog:https://hiper-dog-projeto-final-5qw7.vercel.app/
* Link para o Repositório: https://github.com/YukiSukiyama/HiperDog-Projeto-Final
