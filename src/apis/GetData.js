import axios from "axios";

const BASE_API_BOOKS = "http://localhost:8081/book";
const BASE_API_BOOKS_LIST = "http://localhost:8081/books/list";
const BASE_API_AUTHOR = "http://localhost:8081/author";
const BASE_API_USER = "http://localhost:8081/user";


export const getTopTen = () => axios.get(`${BASE_API_BOOKS}/top10books`);
export const getAllBooks = () => axios.get(`${BASE_API_BOOKS}/all`);
export const getGenres = () => axios.get(`${BASE_API_BOOKS}/getGenres`);
export const getLanguages = () => axios.get(`${BASE_API_BOOKS}/getLanguages`);
export const getCollections = () => axios.get(`${BASE_API_BOOKS}/getCollections`);
export const sendNewAuthor = (authorData) => axios.post(`${BASE_API_AUTHOR}/add`, authorData, {
    headers: {
        'Content-Type': 'application/json'
    }
})
export const sendNewUser = (userData) => axios.post(`${BASE_API_USER}/create`, userData, {
    headers: {
        'Content-Type': 'application/json'
    }
});



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
export const promoteToAuthor = (userId, token, promotionData) => {
    return axios.post(`${BASE_API_USER}/${userId}/promoteToAuthor`, promotionData , {
        headers: {
            Authorization: `${token}`
        }
    });
};
