import axios from "axios";

export const getNote = async (id) => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/note/items/note`,
            method: "GET",
            params: {
              id: id
            },
            withCredentials: true
          }).then((res) => {
            resolve(res.data);
          }).catch((err) => {
            if(err.response){
                reject(err.response.data);
            }
            else{
                reject(err.message)
            }
        });
    });
}