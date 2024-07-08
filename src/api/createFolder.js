import axios from "axios";

export const createFolder = async (parent, name) => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/items/folder`,
            method: "POST",
            data: {
              parent: parent,
              name: name
            },
            withCredentials: true
          }).then((res) => {
            resolve(res.data);
          }).catch((err) => {
            reject(err.response.data);
        });
    });
}