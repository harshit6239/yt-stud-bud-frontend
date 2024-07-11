import axios from "axios";

export const deleteFolder = async (id) => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/items/folder/delete`,
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