docker pull postgres
node .\src\db\postgres\migrations\exec.js
run -d \
 --name PostgresContainer \
 -e POSTGRES_PASSWORD=password \
 -e POSTGRES_USER=root \
 -e POSTGRES_DB=financeapp \
 -v /postgres/finance-app/var/lib/postgresql/data \
 -p 5432:5432 \
 postgres
