import axios from "axios";

const BASE_API_BOOKS = "http://localhost:8081/book";

export const getTopTen = () => axios.get(`${BASE_API_BOOKS}/top10books`);