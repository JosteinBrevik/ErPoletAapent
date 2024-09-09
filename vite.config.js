import path from "path"
import { createVuePlugin } from 'vite-plugin-vue2'; 

export default {
  plugins: [createVuePlugin()],
  resolve:{
    alias: [
      {
        find: '@', replacement: path.resolve(__dirname,'/src')
      }
    ]
  },
  test: {
    environment: ['jsdom'],
  }
};
