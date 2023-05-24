import axios from "axios";
import { NonSensitiveDiaryEntry } from "../types";
const baseUrl = "api/diaries";

const getAllNonSensitiveDiaries = () => {
    const request = axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
    return request.then((response) => {
        return response.data;
    });
};

export default { getAllNonSensitiveDiaries };
