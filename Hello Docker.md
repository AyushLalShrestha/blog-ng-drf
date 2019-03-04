# DevOps Roadmap https://github.com/kamranahmedse/developer-roadmap
# Hello Docker: https://docker-curriculum.com/

<!-- Few docker commands -->
1. List docker images available: docker images
2. Run a docker container using the images present: docker container run -d --name <container-name> <image-name>
3. Run docker container exposing a port, i.e host port to container port mapping: docker container run --publish 6666:80 --detach --namewebhost nginx
4. docker container run --publish 8888:80 --name webhost -d nginx:1.11 nginx -T
5. docker run -it --name node1 -p 2222:22 python:2.7-slim /bin/bash
6. mount host's file to container's mount path and run a node app: docker run --platform=linux -it --rm --name node -d -v "$(pwd):/src" -w /src -p 8080:3000 node:7.7.4-alpine node app.js

7. docker container rm -f <CONTAINER_ID>
8. docker container top
9. inspect a network adapter: docker container inspect nginx
10. docker container stats
11. docker container run -it --name proxy nginx bash


<!-- Hello Docker: Exercise -->
1. docker pull busybox
2. docker run busybox
3. docker run busybox echo "Hello from BusyBox"
4. - docker container ls --all
   - docker ps -a
6. docker run -it busybox sh
7. docker rm 305297d7a235 ff0a5c3750b9
   - docker rm $(docker ps -a -q -f status=exited)
   - docker container prune
8. docker run --rm prakhar1989/static-site <!-- Download and run docker image from docker hub -->
   - docker run -d -P --name static-site prakhar1989/static-site
   - (or) docker run -p 8888:80 prakhar1989/static-site
9. docker port <container name>
10. docker stop <container name>
11. docker images
   - docker rmi <image id>

   <!-- you can create a network for a container -->
1. docker network create myapp-net
2. docker run -d --name es --net myapp-net -p 9200:9200 -p 9300:9300 \
        -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2
3. docker run -d --net myapp-net -p 5000:5000 --name foodtrucks-web ayushlalshrestha/foodtrucks-web

<!-- see the contents of the file system of the docker containers at -->
1. docker exec -it <container-name> /bin/bash  (OR sh)
2. ls -l /var/lib/docker/aufs/diff

<!-- See how a Dockerfile should be made -->
    - https://www.howtoforge.com/tutorial/how-to-create-docker-images-with-dockerfile/
    

<!-- Docker build -->
1. docker build -f Dockerfile -t <image-name> .