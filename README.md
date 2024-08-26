# Derma App

Simple mobile app made in react native to familiarize with the framework and tools to create hibrid apps.

## Run Locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

   or

   ```bash
    npm start
   ```

## Deploy to Review/QA

Make sure to change all your environment variables values to the one corresponding to the environment you are going to deploy.

There are three main methods to do this using expo: app store testing tracks, internal distribution, and development builds with EAS Update.

We will be using Internal distribution method but some steps overlap in all methods

### 1. Create a build profile.

We will use the `preview` profile. To do this we create the `eas.json`

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    }
  }
}
```

### 2. Setup who can access the app

On a free Apple Developer account we need to manually specify which devices can run this app by entering their UUID after running the command and with the help of a credentials.json file

```bash
eas device:create
```

### 3. Create a build

We now create a build with the preview profile. This will then generate a link that can be shared with any android phone and the iphones that match the UUID codes registered.

### 4. (USER SIDE) Install the app

As a user you only need to install the app by following the link. If you are on IOS 16 you need to enable developer mode before you can run the app.
