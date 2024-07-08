import axios from "axios";

export const search = (query) => {
    query = query.trim();
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/gemini/`,
            method: "GET",
            params: {
              query: query
            }
          }).then((res) => {
            const obj = {
              query: query,
              response: res.data
            };
            resolve(obj);
          }).catch((err) => {
            reject(err);
        });
    });
};