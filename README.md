# README

## Prerequisite

1. Set environment variables.
   1. set `NEXTAUTH_SECRET` with `openssl rand -base64 32`
   2. set `NEXTAUTH_URL` like `http://localhost:3000/api/auth`
2. Set up PostgreSQL database with seed data.
   1. manually create db
   2. `npm run reset`

## What features i've done?

1. The user can sign in using their username.
2. The UI displays differently for guests and authenticated users.
3. Users can add comments and edit their posts.
4. The navbar and header are responsive across different devices.
5. The sign-in page is responsive across different devices.
