# Overview
This is the backend repo for Ha.BIT API server. This repo is to be ran with the front-end. For further and more complete documentation of the app: https://github.com/notaika/Ha.BIT. 

# Installation
IMPORTANT: This is the back-end only. For the frontend server, please navigate to: https://github.com/notaika/Ha.BIT

On your terminal, run:

1. `npm install`
    - (packages includes: axios, bcryptjs, cors, dotenv, express, jsonwebtoken, knex, mysql2, router)

2. Ensure that you setup your environment variables in a .env file: 
![env-setup example](public/images/env-setup.png)

3. `npm start`

# Tech Stack
### Backend:
- Javascript
- Express
- Node.js
- MySQL + Knex.js
- JWT/bycryptjs for authentication