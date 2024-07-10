import axios from "axios";

export const updateNote = async (id, content) => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/items/note`,
            method: "PATCH",
            data: {
              id: id,
              content: content
            },
            withCredentials: true
          }).then((res) => {
            resolve(res.data);
          }).catch((err) => {
            reject(err.response.data);
        });
    });
}