# Getting started

What is the purpose of this API? 

This API serves as a simple NestJS boilerplate for both my personal reference and for others to use :)

What concepts are covered in this API?

- Implementation of routes
- Authentication using Passport and JWT
- File upload using Multer and S3
- Usage of the Prisma ORM and its integration with NestJS
- Handling the request lifecycle using Nest concepts such as Guards and Pipes

## Table of Contents
1. [Initialization](#initialization)
2. [JWT Configurations](#jwt-configurations)
3. [Testing API](#testing-api)
4. [S3](#s3)

**Attention**: insert all commands line in **/api-nestjs-bp** path in your terminal

### What you will need to execute this project?
- pnpm
- Docker
- NodeJS

## Initialization

#### 1. Install dependencies

```bash
    pnpm install

    # copy the `.env.example` to an `.env` file
    cp .env.example .env

```

- Change the capitalize `.env` fields, especially the fields under the `# PostgreSQL database configs` comment

#### 2. Create a container using Docker

```bash
# To create a container and scaffold it in the background process
docker-compose up -d
```

or

```bash
docker compose up -d
```



#### 3. Apply Prisma migration

    pnpm prisma db push

---

## JWT Configurations

#### 1. Create a hash

Create a hash to be your JWT public key

    openssl rand -base64  32

#### 2. Use the created hash

-  Insert the created hash in the **JWT_SECRET_KEY** field in the .env file.

#### 3. Start the application

    pnpm start

---

## Testing API

#### 1. Create a user
**Note:** the following name and email was generated automatically by **4devs**

```bash
curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"name": "Marcos Felipe Ian Lopes", "email": "marcos@email.com", "password": "1234"}'
```

#### 2. Make a login

Login using the password and user created in last step

```bash
curl -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "marcos@email.com", "password": "1234"}'
```

#### 3. Test in a protected route

Insert the generated token where is it the curly braces (remove the curly braces)

```bash
 curl -X GET http://localhost:3000/posts -H 'Content-Type: application/json' -H "Authorization: Bearer {token}"
```

If everythihg is alright you should see a single square bracket: "[]"


If you prefer, download and use the insomnia specific collection located in **`/collection` folder**

---
## S3
Note that the `.env.example` has some S3 environment variables, just replace them to start use with you own bucket 
