import axios from "axios";

export const validateToken = () => {
    return new Promise((resolve, reject) => {
        axios({
            url:  `/api/user/validate/`,
            method: "GET",
            withCredentials: true
          }).then((res) => {
            resolve(res.data);
          }).catch((err) => {
            reject(err);
        });
    });
}