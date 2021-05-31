# ecommerce-app-api

## Setup
- "npm install" or "yarn install"
- "npm server.js" to run server

These commands will setup node_modules and run server. Make sure .env file is present with (MONGO_DB_URI and MY_JWT_SECRET) variables.

## Summary
+ It is a simple Ecommerce API that is based on multi-role authentication. A user can view and purchase items after registeration.
+ Admin can add/view/delete/list/update items, view transactions and view customers. 
+ If I had more time I wanted to add front-end and write tests to test everything.

### API Endpoints
            
##### AUTH: 
+ /api/login (POST)
+ /api/signup (POST)

 
##### USER:
+ /api/user/:id (GET)
+ /api/user/list (GET)

 
##### ITEMS:
+ /api/item (POST)
+ /api/item/create  (POST)
+ /api/item/update  (POST)
+ /api/item/list (GET)

 
##### TRANSACTION:
+ /api/transaction/ (POST)
+ /api/transaction/create (POST)
+ /api/transaction/update (POST)
+ /api/transaction/delete (POST)
+ /api/transaction/list (GET)