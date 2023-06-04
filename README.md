# Getting started

**Attention**: insert all commands line in **/api-nestjs-bp** path in your terminal

## Initialization

#### 1. Install dependencies

```bash
    pnpm install

    # copy the `.env.example` to an `.env` file
    cp .env.example .env

```

- Change the capitalize `.env` fields, especially the fields under the `#PostgreSQL database configs` comment

#### 2. Create a container in Docker

```bash
# To create a container and scaffold it in the bg process
docker-compose up -d
```

or

```bash
docker compose up -d
```



#### 3. Generate prisma migration

    pnpm prisma migrate dev init

---

## JWT Configurations

#### 1. Create a hash

Create a hash to be your JWT public key

    openssl rand -base64  32

#### 2. Use the created hash

- insert the created hash in **JWT_SECRET_KEY** field on `.env` file

#### 3. Start the application

    pnpm start

---

### Testing API

#### 1. Create a user

```bash
curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"name": "Marcos Felipe Ian Lopes", "email": "marcos@email.com", "password": "1234"}'
```

#### 2. Make a login

Login using the password and user created in last step

```bash
curl -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "marcos@email.com", "password": "1234"}'
```

#### 3. Test in a protected route

Use the generated token where is it the curly bracket

```bash
 curl -X GET http://localhost:3000/posts -H 'Content-Type: application/json' -H "Authorization: Bearer {token}"
```

If everythihg is alright you should see a single square bracket: "[]"

---

If you prefer, download and use the insomnia specific collection located in **`/collection` folder**
