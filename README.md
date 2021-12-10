# Exchange DEMO 
## App to send exchanges:

Developed with:
[![](https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png)](https://nodejs.org/es/)

## Explanation

  You can send exchange to anywhere and to anyone. The services in this project can do:
  
   1. Administrator actions management
   2. Transactions management
   3. Register new exchangers and validate their profiles.

## First steps

Clone the repository:

This repo is a mono one, so, when you clone it, you can select wich project you work with. For this example we are gonna select **api**

```
$ git clone https://github.com/jefersondevelop/exchange-demo.git
```

Configure your user and password and press Enter. Then go to the project you want, in this case **api**.

```sh
cd exchange-demo/api
```

## Installation

Api requires: 

1. [Node.js](https://nodejs.org/) v10+
2. [MongoDb](https://www.mongodb.com/) v4.4.5+
3. [Mogoose](https://mongoosejs.com/) v5.12.3+
4. [Nodemailer](https://nodemailer.com/about/) V6.6.0+
5. [Typescript](https://www.typescriptlang.org/) v4.0.2+

Install all dependencies doing:

```sh
npm i
```

Then create a new .env file copying all environment variables of .env.example and set all values as bellow:



```sh
APP_VERSION
EMAIL_USER
CLIENT_ID
CLIENT_SECRET
ACCESS_TOKEN
REFRESH_TOKEN
CLIENT_URL
SEED_KEY
NODE_ENV
DB_URI
```

## Nodemailer

This server uses Nodemailer to send email. This uses Gmail SMTP and OAuht2 to authentication. 

To configure a new account, you can use this tutorial bellow: 

https://dev.to/chandrapantachhetri/sending-emails-securely-using-node-js-nodemailer-smtp-gmail-and-oauth2-g3a

## Mongodb

You must create a new mongo database connection and use the URI connection to set it in .env file.

## Running - Local Enviroment

To run project in watch mode (with nodemon).

    ```sh
    $ npm run start:watch
    ```
    
## License

Developed by Jeferson Alvarado