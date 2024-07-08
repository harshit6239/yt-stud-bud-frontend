import axios from "axios";

export const imageUpload = (image) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", image);
        axios({
            url: `/api/note/upload/`,
            method: "POST",
            withCredentials: true,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
        });
    });
}
