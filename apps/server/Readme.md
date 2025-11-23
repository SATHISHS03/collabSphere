# Auth module (Refactored)


Wiring:
1. Ensure `apps/server/.env` contains JWT secrets:


```
JWT_SECRET=yoursecret
JWT_REFRESH_SECRET=yourrefreshsecret
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=30d
```


2. Register routes in `app.ts`:


```ts
import authRoutes from './auth/auth.routes';
app.use('/api/v1/auth', authRoutes);
app.use(globalErrorHandler);
```


3. Run prisma migrations to add `RefreshToken` model and generate client:


```
pnpm prisma migrate dev --name add_refresh_token
pnpm prisma generate
```


4. Start server from workspace root:


```
cd apps/server
pnpm dev
```




// End of refactor