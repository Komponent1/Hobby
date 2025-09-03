docker run -d -p 4000:4000 -v $PWD/app:/usr/app --add-host host.docker.internal:host-gateway --name client client
