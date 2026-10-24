## Deploying on Pethost

[Pethost](https://pethost.dev) has a one-click template that runs Parse Server with MongoDB and Parse Dashboard at one HTTPS address.

Here are the steps:

1. Open the [Parse Server template](https://pethost.dev/templates/parse-server/) and select **Deploy on Pethost**.
2. After signing in, enter a password for Parse Dashboard and select **Create project**.
3. Open the project's address and sign in to Parse Dashboard as `admin` with that password.

Apps use `https://<your-project-address>/parse` as the server URL, with the `APP_ID` from the project's `.env`. The `MASTER_KEY` in the same file is for servers only.
