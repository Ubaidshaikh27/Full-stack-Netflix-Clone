import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //This means whenever we put "/api" it will take the prefixx as "http://localhost:5000"
  //by this we dont have to put "http://localhost:5000" in our endpoint again and again
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000"
      }
    }
  }
})
