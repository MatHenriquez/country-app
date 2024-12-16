## Country App Installation Guide

## Requirements

- Node.js v20.13.1 or later.
- NPM v10.5.2 or later.
- TypeScript v5.7.2.

## General Steps

- Clone this repository on your local machine.
- OPTIONAL: Open a command line terminal at the root of the project and run `npm ci` if you want to have `husky` hooks available.
- Follow the [**api**](./api/README.md) project installation guide.
- Follow the [**client**](./client/README.md) project installation guide.

### Notes:

The project already includes the `.env` files due to the challenge requirements. If you want to improve this, go to the `.gitignore` files of both `api` and `client` projects and uncomment the following lines:
  - api .gitignore: `# .env `
  - client .gitignore: `# .env*.local`

After doing this you should go to the `workflows` files and add the relevant variables using the GitHub environment variables.