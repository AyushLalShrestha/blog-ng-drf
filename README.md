# Dockerize branch of the blog-sell-buy application
Blog app, to be dockerized with 3 main containers:
    1. API engine, hosting django rest framework's backend webserver
    2. postgre sql server, for database 
    3. UI engine, serving angular 4 JS UI


# After building the respective images using 'docker build . -t <container-name>':
docker run --platform=linux -it --rm --name postgres -v postgres_data:/var/lib/postgresql/data  -d --net bsb-net -p 5433:5432 postgre

docker run --platform=linux -it --rm --name apiengine -d -v "$(pwd):/src" -w /src --net bsb-net -p 5050:8000 apiengine

docker run --platform=linux -it --rm --name uiengine -d -v "$(pwd):/ngapp" -w /ngapp --net bsb-net -p 5051:4200 uiengine

docker exec -it apiengine /bin/bash
docker exec -it postgres /bin/bash
docker exec -it uiengine sh
