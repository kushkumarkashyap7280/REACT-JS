import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// fetch data
export const fetchData = async () => {
  const response = await api.get("/posts");
  return response.data; // Return the data, not the full response
};

// fetch individual data
export const fetchIndividualData= async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data; // Return the data, not the full response
};

// fetch per page
export const fetchPerPage = async (page, limit) => {
  const response = await api.get(`/posts?_page=${page}&_limit=${limit}`);
  return response.data; // Return the data, not the full response
};


// delete post 
export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data; // Return the data, not the full response
};

// update post 
export const updatePost = async (id) => {
  const response = await api.patch(`/posts/${id}`,{
    title: "updated title",
    body: "updated body",
  });
  return response.data; // Return the data, not the full response
};


// infinite scroll

export const getUsers = async (pageParam = 1)=>{
  const response = await api.get(`https://api.github.com/users?per_page=10&page=${pageParam}`);
  return response.data; // Return the data, not the full response
}