import axios from "axios";

export const getItems = async (folder) => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/items/`,
            method: "GET",
            params: {
              folder: folder
            },
            withCredentials: true
          }).then((res) => {
            resolve(res.data);
          }).catch((err) => {
            reject(err.response.data);
        });
    });
}