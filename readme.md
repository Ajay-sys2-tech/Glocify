# Online Shoping Arcade
It is a place where vendors can register themselves and people csan buy ites from their local stores.
The app is made in node.js and is dockerized. For testing purpose follow steps below:
# For running in docker
1. Create a volume:
    docker volume create mongo_db
2. Create a network which will be used by app and the database
    docker network create glocify
3. Use the following commands to start the app on localhost port 3000, make sure to not change the name of mongo_db container:

    docker container run --name mongo_db -v mongo_db --network glocify -d mongo:latest
    
    docker container run --name node_api -p 3000:3000 -e MONGODB_URI=mongodb://mongo_db:27017 -e PORT=3000 -e DB_NAME=Users -e DB_HOST=mongo_db --network glocify anshumanraj/custom_node_app:1.0.0

You can change the port you want to access from "-p xyz:3000".