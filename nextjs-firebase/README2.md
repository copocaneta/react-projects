# My notes

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
