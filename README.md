# Getting Started with URL Shortener App (Backend)

#### Tasks:

-   [ ] Create a System Design Document for the App.
-   [ ] The REST API should be able to create a shortened URL.
-   [ ] The REST API should be able to redirect to the original URL.
-   [ ] Dockerize the application.
-   [ ] Provision an EKS cluster on AWS using Terraform.
-   [ ] Deploy the REST-API on EKS.
-   [ ] Create a CI/CD pipeline for the application using Github Actions.
-   [ ] The pipeline should be able to deploy the application on EKS continuously when a new commit is pushed to the main branch.

#### Technology used:

1. NodeJS
2. Express (to write backend APIs)
3. Mongo Database

#### To start with this app please follow below steps:

1. clone this app using command <i>git@github.com:SumitJadiya/URL-Shortener-service.git</i>.
2. run "npm install" to install dependencies.
3. Setup mongo in local and then create a file .env in the main(same directory having readme) folder, this file will have the contents: <br/>
    - SERVER_PORT = <your_server_port>
    - DB_URL = '<your_mongo_db_url>'
4. once the dependencies are installed, and mongo setup is complete. You're good to work on this repo.

#### PSB the list of folder/files and their uses:

1. Models -> The list of all the models (In our case, the only model is URL)
2. Controllers -> The core logic of encryption/decryption
3. Routes -> Routes through which FE can access the APIs
4. config -> Configuration related file (In our case, mongo database connection details)

### Algorithm used for Encryption/Decryption

<p>The longString is encoded to a shortString by generating random characters from a string set. Here, I've used a String (which consists of all the characters, numbers) to generate the random characters. </p>
<p>As soon as the string is encoded, the string is stored in database (mongo in this app)</p>
<p>When User tries to encode a longString again and again, I'm checking if the URL is already present i'm returning the short URL as it is <b>without generating</b> new one.</p>
