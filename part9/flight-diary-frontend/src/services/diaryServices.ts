import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";
const baseUrl = "http://localhost:3001/api/diaries";

export const getAllNonSensitiveDiaries = async () => {
    return axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then((res) => res.data);
};

export const addNewDiaryEntry = async (newDiary: NewDiaryEntry) => {
    return axios.post(baseUrl, newDiary).then((res) => res.data);
};
