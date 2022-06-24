docker run -p 3000:3000 -d -v $PWD/app:/usr/app --name blog_client blog_client
docker network connect server_default blog_client