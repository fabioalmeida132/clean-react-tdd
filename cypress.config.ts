import {defineConfig} from 'cypress'
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  env: {
    realEmail: process.env.REACT_APP_API_EMAIL,
    realPassword: process.env.REACT_APP_API_PASSWORD
  },
  e2e: {
    baseUrl: 'http://localhost:8080',
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  }
})
