import axios from "axios";

const baseUrl = "api/diaries";

const getAllNonSensitiveDiaries = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => {
        return response.data;
    });
};

export default { getAllNonSensitiveDiaries };
