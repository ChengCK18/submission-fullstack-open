import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";
const baseUrl = "api/diaries";

const getAllNonSensitiveDiaries = () => {
    const request = axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
    return request.then((response) => {
        return response.data;
    });
};

const addNewDiaryEntry = async (newDiary: NewDiaryEntry) => {
    const response = await axios.post(baseUrl, newDiary);
    return response.data;
};

export default { getAllNonSensitiveDiaries, addNewDiaryEntry };
