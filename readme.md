#Introduction
This is a simple client side application with a backend server to handle login though Github's Oauth API.
#Requirements:
* Angular
* Nodejs
* NPM

#Content
For dev setup follow the instructions:
##Server
Simple server to handle Oauth flow for Github signin/register.

###Setup
In the Server folder run:

```
npm install
npm start

```

##Client
All data is being fetched from the HN API

###Setup
In the Client folder run:

```
npm install
ng serve

```

#Issues
__access_token__ : this is being sent from the server as a hash fragment in a redirect to a client side link which stores the token, please se github.js in the Server/src/auth folder and token.component.ts in the Client/src/app folder.
I don't like this approach and feel it is falabile but that is due to API limitations as Github has a Authorization Grant style not Implicit style Oauth.

#Discussion

