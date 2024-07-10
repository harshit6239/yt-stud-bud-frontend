import axios from "axios";

export const createNote = async (parent, videoId) => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/items/note`,
            method: "POST",
            data: {
              parent: parent,
              videoId: videoId
            },
            withCredentials: true
          }).then((res) => {
            resolve(res.data);
          }).catch((err) => {
            reject(err.response.data);
        });
    });
}