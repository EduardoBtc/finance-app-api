Comandos docker:

docker pull postgres
run -d \
 --name PostgresContainer \
 -e POSTGRES_PASSWORD=password \
 -e POSTGRES_USER=root \
 -e POSTGRES_DB=financeapp \
 -v /postgres/finance-app/var/lib/postgresql/data \
 -p 5432:5432 \
 postgres

docker pull postgres run -d --name PostgresContainer -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -e POSTGRES_DB=financeapp -v /postgres/finance-app/var/lib/postgresql/data -p 5432:5432 postgres

docker ps -a //tras containers nao inicializados porem que existem na maquina

docker start 'Id container' // inicializar o container

Comandos npm/node:
npm run start:dev
node .\src\db\postgres\migrations\exec.js
