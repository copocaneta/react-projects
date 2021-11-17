This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

- Ending initial Readme.

---

## My notes

- This is done based largely on this [tutorial](https://www.youtube.com/watch?v=Sdv3bw2rIuQ).

- My notes below:

## Setting up Firebase

- Login to FIrebase
- Create Project
- Create database for our `todo`
- Create a collection and place 2 records inside with fields `title`, `detail` and `timestamp`.
- Create Authentication for Google, enable it

## Setting up NextJS:

- Run this:

  ```sh
  npx create-next-app@latest --ts
  ```

- Give a name to the project.

- When it ends I get this output:

  ```sh
  Success! Created nextjs-firebase at /Users/thiagob/Documents/estudos/react-projects/nextjs-firebase
  ```

- Commands:

  - Starts the development server:

    ```sh
    npm run dev
    ```

  - Builds the app for production.

    ```sh
    npm run build
    ```

  - Runs the built app in production mode.
    ```sh
    npm start
    ```

## Install MaterialUI:

- First we run this:

  ```sh
  npm install @mui/material @emotion/react @emotion/styled
  ```

- And then this:

  ```sh
  npm install @mui/material @mui/styled-engine-sc styled-components
  ```

- And then the SVG Icons:

  ```sh
  npm install @mui/icons-material
  ```

## Setting up `firebase.ts`

- So we go back to Firebase website.
- Click in "Project Overview"
- Click um "web"
- Fill in the "App Nickname" to register the app and then click on the "Register app" button
- Then we will receive a code like this:

  ```js
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "dfsdcsdsdsds,
    authDomain: "nextjs-firebase-23233j.firebaseapp.com",
    projectId: "nextjs-firebase-23232",
    storageBucket: "nextjs-firebase-32323.appspot.com",
    messagingSenderId: "435235",
    appId: "3:499393"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  ```

- We create a `firebase.ts` file at our project root.

- And we also install this:

  ```sh
  npm install firebase
  ```
