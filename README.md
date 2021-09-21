# Backlog - track your video game activity

A Single Page Application for manage a video game backlog. Build with Symfony / React.

Made for educational purposes.

I made this application to share the knowledge acquired during this year. Connect a SPA built with React, with an 
API Rest made with Symfony.

## Environment used during development
* [Symfony 5.2.3](https://symfony.com/doc/5.2/setup.html) 
* [Composer 2.0.9](https://getcomposer.org/doc/00-intro.md)
* MAMP 6 (985)
    * Apache 2.4.46
    * PHP 7.3.21
    * MySQL 5.7.30

## Installation
1- Clone the GitHub repository in the desired folder :
```
    git clone https://github.com/ProfesseurOrme/Backlog.git
```
2- Go to your project directory and install the project dependencies with the [Composer](https://getcomposer.org/doc/00-intro.md) command  :
```
    composer install
```

3- Configure your environment variables in the file `.env` such as :

* Database url  :
```
    DATABASE_URL=mysql://db.username:db.password@127.0.0.1:3306/backlog
```

4- If the `.env` file is correctly configured, create the database with the command below :
```
    php bin/console doctrine:database:create
```
5- Create the different database tables :
```
    php bin/console doctrine:migrations:migrate
```
6- Install fake datas with fixtures to enhance the API (Here, we will create an administrator access with 
"AdminTest" as username and "test1234" as password, don't worry, it won't work in demo website :o)) :
```
    php bin/console doctrine:fixtures:load
```

7- The API is secured by a Token manager. To configure it and generate the keys, enter the commands
following from the root of the project :
```
    mkdir config/jwt
    openssl genrsa -out config/jwt/private.pem -aes256 4096
    openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
```
8- One of the commands should ask you to enter a "passphrase": type "apibacklog" in the command prompt. Then 
enter the "passphrase" in the .env file `.env` (ligne 33) :
```
    JWT_PASSPHRASE=apibacklog
```

9- Then install the assets of the Front with : 
```
    yarn encore dev
```
Or :
```
    npm run dev
```

You can create a production build with :
```
    yarn encore production
```
Or :
```
    npm run build
```

10- Finally, create an `.env` file in ./assets/ with some information (Including a [RAWG api key](https://rawg.io/apidocs)) :
```
    ###> RAWG API Key ###
    RAWG_API_KEY=your_rawg_api_key
    ###< RAWG API Key ###

    ###> Backlog API URL ###
    BACKLOG_API_URL_DEVELOPMENT="your_api_url"
    BACKLOG_API_URL_PRODUCTION="your_api_url"
    ###< Backlog API URL ###
```

11- Your project is ready to use! To use the application in a local environment, please
inquire about this
[documentation](https://symfony.com/doc/current/setup.html#running-symfony-applications).