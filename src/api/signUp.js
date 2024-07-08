import axios from "axios";

export default function signUpReq({email, username, password, confirmPassword}){
    return new Promise((resolve, reject) => {
        axios({
            url: `/api/user/register/`,
            method: "POST",
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: email,
                username: username,
                password: password,
                confirmPassword: confirmPassword
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