## Docker + Node.js + RabbitMQ

Exemplo de aplicação rodando em ambiente [Docker](https://www.docker.com/) com [Node.js](https://nodejs.org/en/) e [RabbitMQ](https://www.rabbitmq.com/).

## Utilização

	npm install
    docker-compose up

## Endereço do painel do RabbitMQ:

    http://localhost:15672

> Usuário: rabbitmq / Senha: rabbitmq

Para chamar um novo worker, acesse o container do node e execute o arquivo **worker.js**

    sudo docker exec -it web /bin/bash
    node worker.js

Para enviar uma mensagem, utilize o arquivo **task.js**

    sudo docker exec -it web /bin/bash
    node task.js mensagem...

Cada ponto (.) enviado na mensagem, contará como um segundo na função setTimeout para simularmos uma carga para nossos workers.

Os arquivos utilizados foram tirados do tutorial oficial do [RabbitMQ](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html).
