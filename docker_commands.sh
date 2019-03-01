docker run --platform=linux -it --rm --name postgres -d --net bsb-net -p 5433:5434 postgre

docker run --platform=linux -it --rm --name apiengine -d -v "$(pwd):/src" -w /src --net bsb-net -p 8080:3000 bsbapiengine

docker exec -it apiengine /bin/bash
