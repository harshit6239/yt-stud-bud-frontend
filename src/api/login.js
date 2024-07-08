import axios from "axios";

export default function login({ email, password}) {
    return new Promise((resolve, reject) => {
        axios({
            url: `/api/user/login/`,
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: email,
                password: password
            }
        })
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err.response.data);
        });
    });
}