import axios from 'axios'

const api = axios.create({
  baseURL : "https://jsonplaceholder.typicode.com"
});

// fetch data


export const fetchData = async () => {
  return api.get("/posts")
};