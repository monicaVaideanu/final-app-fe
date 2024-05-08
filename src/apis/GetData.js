import axios from "axios";

const BASE_API_BOOKS = "http://localhost:8081/book";
const BASE_API_BOOKS_LIST = "http://localhost:8081/books/list"

export const getTopTen = () => axios.get(`${BASE_API_BOOKS}/top10books`);

export const getWishList = (userId, token) => {
    return axios.get(`${BASE_API_BOOKS_LIST}/user/${userId}`, {
      headers: {
        Authorization: `${token}`
      }
    });
};

export const deleteFromWishList = (userId, token, bookId) => {
    return axios.delete(`${BASE_API_BOOKS_LIST}/delete/${userId}/${bookId}`, {//delete/{userId}/{bookId}
      headers: {
        Authorization: `${token}`
      }
    });
};

export const updateStatusForBook = (userId, token, bookId, wish) => {
    return axios.post(`${BASE_API_BOOKS_LIST}/updateStatus`, null, {
      params: {
        userId: userId,
        bookId: bookId,
        wish: wish
      },
      headers: {
        Authorization: `${token}`
      }
    });
};
export const deleteAllWishListByUser = (userId, token) => {
    return axios.delete(`${BASE_API_BOOKS_LIST}/user/${userId}/all`, {
        headers: {
            Authorization: `${token}`
        }
    });
};

