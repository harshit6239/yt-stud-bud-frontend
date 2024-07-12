import axios from "axios";

export default function logout() {
    return new Promise((resolve, reject) => {
        axios({
            url: `/api/user/logout/`,
            method: "GET",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err.response.data);
        });
    });
}