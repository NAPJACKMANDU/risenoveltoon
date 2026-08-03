import axios from "axios";

export const loginApi = async(id : string, pw : string) => {
    const response= await axios.post("/webToonMyPage", {id, pw});
    return response;
}