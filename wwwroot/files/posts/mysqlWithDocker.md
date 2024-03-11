Docker is a tool that allows the creation, distribution, execution and deployment of applications inside containers. These containers are isolated, self-contained, lightweight environments that include everything necessary to ensure the proper functioning of an application, such as libraries, dependencies, configurations and code. In this way, Docker ensures that an application runs consistently in any environment, allowing developers to build, test and deploy applications quickly and efficiently.

A container is similar to a shipping container, since in this case it is a software package that contains the packaged code of the application along with its libraries and necessary dependencies. They work through virtualization because unlike other virtualization methods, containers do not contain operating system images, making it lighter and more portable.

Let's see how we can use Docker to host our database without losing the data in case of loss, we will discuss the following points:
1. Docker Image
2. Ports
3. Enviroment keys
4. Volumes



We are going to work with docker using docker-compose which is a tool that allows us to work with multi-container applications, this configuration is defined in a file in YAML format **docker-compose.yml** .

> A multi-container application works by running services in different containers.
> In this case one container would be MySQL and another PhpMyAdmin.

Two commands to have in mind are `docker-compose up` which builds and runs the containers, and on the other hand `docker-compose down` does the opposite by stopping and removing the containers and associated resources.

In our configuration file at the highest level we find the services and the version which determines the syntax and supported features of the configuration file, as well as its operation with the different versions of Docker Engine and Docker Compose.

```yml
version: '3.4'

services:
    phpmyadmin:
        
    mysql:
```
Let's start defining our services, the first thing we need is an image of the service to be used, an image contains the instructions of the container to be created, i.e. its code, dependencies, etc.

For this demo we will use two images from the thousands available at [Docker Hub](https://hub.docker.com/.).


### Image

The configuration of the image is done as follows `image: <image name>:<version>`, along with the name we can introduce a tag with the version we want to use in this case we will use 'latest', but I think it is better to put directly the version you need and then you are responsible for updating it.


```yml
version: '3.4'

services:
    phpmyadmin:
        image: phpmyadmin:latest

    mysql:
        image: mysql:latest
```

There are different configurations for the service such as `restart: always` which ensures that the container is automatically restarted in case of failure to keep the service running without manual intervention. But in this example we are only going to use the minimum necessary ones.

One setting I like to use is `depends_on: <Service Name>` is used to specify dependencies between services. This means that a dependent service will not start until the specified service has been successfully started.


### PORTS
As we have seen, each service is an isolated container, i.e. they are separated from the host network. Therefore, to enable communication between the applications and services running inside the containers and the host system or devices on the external network, it is necessary to establish a port mapping. They are configured in such a way as `ports:<host:container>`.

### ENVIROMENT KEYS
The most important configuration is the enviroment option, this section is in charge of setting environment variables that will be passed to the container when it is started, depending on the image to be used, some keys or others are needed.


> For more information on the necessary keys, please refer to the documentation of the image in use.

For the mysql service we need:


- **MYSQL_ROOT_PASSWORD:** This variable is mandatory and is in charge of setting the root super user password.
- **MYSQL_DATABASE:** Allows you to create a database when starting the container, this variable is optional and can be replaced by a SQL script to configure the table.
- **MYSQL_USER, MYSQL_PASSWORD:** These are optional and are used to create a user other than root. In case of using also the previous variable this user and password will be assigned as super user of that table.


For the phpmyadmin service we only need one key:

- **PMA_HOST:** Defines the name or address of the MySQL server, as the server is inside the same docker compose you only need to put the name of your service.

<br>

Our minimal configuration file would look like this:
```yml
version: '3.4'

services:  
    mysql:
        image: mysql:latest
        environment:
            MYSQL_ROOT_PASSWORD: root
        ports:
            - "3307:3306"

    phpmyadmin:
        image: phpmyadmin:latest
        ports:
            - 8000:80
        environment:
            PMA_HOST: mysql
```
At this point we can create and use two containers, one with MySQL and the other with PhpMyAdmin, the only problem is the data, since being an independent container once the database is removed it would go with it.

To solve this we will need to create a volume which is a mechanism that allows data to be shared between a container and the host system or between multiple containers. Volumes are a way to persist data generated or used by containers, which makes them useful for maintaining important data even when containers are stopped or deleted.

### Volumes
We are going to mount a volume called "data" which is going to take the '/var/lib/mysql'directory inside the container. This is useful for persisting MySQL database data, since this directory is where MySQL stores its data by default.

This is how our configuration file **docker-compose.yml** would look like configured to create a mysql server and with the phpmyadmin manager and using a volume to ensure the persistence of the database.

```yml
version: '3.4'

services:
    phpmyadmin:
        image: phpmyadmin:latest
        restart: always
        ports:
            - 8000:80
        environment:
            PMA_HOST: mysql

    mysql:
        image: mysql:latest
        restart: always
        environment:
            MYSQL_ROOT_PASSWORD: root
        ports:
            - "3307:3306"
        volumes:
            - data:/var/lib/mysql

volumes:
    data:
        driver: local
```
<br>

Thus, with this single file we have a fully functional database and we have saved ourselves some work by not having to manually install the server on our system.

In conclusion, Docker provides a powerful platform for creating, distributing, and managing containerized applications, ensuring consistency and efficiency across different environments. Combining  with Docker Compose, we can easily define multi-container applications only with a simple YAML file.

With this demo we have a basic example of what can be achieved and all the configuration and customization we can do. We saw how to create a MySQL database with persistence data, but note that you could use other services and the next step is to use your own containerized applications.

