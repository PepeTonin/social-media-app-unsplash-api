# Social Media App - Unsplash API

## Description

This project is a social media application inspired by Instagram. It features an infinite scroll timeline for posts, enhancing performance and user experience. The posts consist of random images from Unsplash, obtained using the Unsplash API.

## Technologies Used

<span>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.0.4-blue.svg?style=flat-square" alt="ts version">
  </a>
  <a href="https://reactnative.dev/">
    <img src="https://img.shields.io/badge/ReactNative-0.74.3-blue.svg?style=flat-square" alt="rn version">
  </a>
  <a href="https://axios-http.com/docs/intro">
    <img src="https://img.shields.io/badge/Axios-1.7.2-purple.svg?style=flat-square" alt="rn version">
  </a>
</span>

- React Native CLI
- Unsplash API (https://unsplash.com/developers)
- API Dummy JSON (https://dummyjson.com/)

## Features

- Infinite scroll.
- Image loading optimization to improve performance.

## Dependencies

- Node 20
- JDK 17
- Smartphone emulator (Xcode for iOS or Android Studio for Android)

## Instructions to Run the Project

1. Clone the repository.
2. Navigate to the project's root directory.
3. Run `npm install` to install dependencies.
4. Run `npx react-native run-ios` or `npx react-native run-android` to start the application.

## File Structure

```plainText
├── android/               # Android native files
├── assets/                # Images and auxiliary resources
│   └── images/            # Images used in the application
├── server/                # Backend of the project
├── src/                   # Project source code
│   ├── app/               # Application pages and routes
│   ├── assets/            # Application-specific resources
│   ├── components/        # Reusable components
│   ├── server/            # Server requests
│   ├── storage/           # Local storage management
│   ├── styles/            # Global and utility styles
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
└── README.md              # Project documentation
```