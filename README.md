# Getting started

**Attention**: insert all commands line in **/API-NESTJS-BP** path in your terminal

## Initialization

`1. Install dependencies`

    pnpm install

`2. Create a cluster in MongoDB Atlas`

insert URI of created cluster in your environment in the `.env.example` file. The field is **DATABASE_URL**

`3. Generate taloired schema`

    npx prisma generate

---

## JWT Configurations

`1. Create a hash`

Create a hash to be your JWT public key

    openssl rand -base64  32

`2. Use the created hash`

insert the created hash in **JWT_SECRET_KEY** field on `env.example` file

`3. Start the application`

    pnpm start

---

### Testing API

`1. Create a user`

```bash
curl -X POST http://localhost:3000/users -H 'Content-Type: application/json' -d '{"name": "Marcos Felipe Ian Lopes", "email": "marcos@email.com", "password": "1234"}'
```

`2. Make a login`

Login using the password and user created in last step

```bash
curl -X POST http://localhost:3000/api/auth/login -H 'Content-Type: application/json' -d '{"email": "marcos@email.com", "password": "1234"}'
```

`3. Test in a protected route`

Use the generated token

```bash
 curl -X GET http://localhost:3000/posts -H 'Content-Type: application/json' -H "Authorization: Bearer {token}"
```

If you prefer, download and use the insomnia specific collection located in **collection folder**


