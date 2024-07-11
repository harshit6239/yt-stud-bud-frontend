import axios from "axios";

export const deleteNote = async (id) => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/items/note/delete`,
            method: "POST",
            data: {
              id: id
            },
            withCredentials: true
          }).then((res) => {
            resolve(res.data);
          }).catch((err) => {
            reject(err.response.data);
        });
    });
}