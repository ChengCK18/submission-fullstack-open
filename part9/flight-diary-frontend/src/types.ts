// import { Dispatch, SetStateAction } from "react";

export interface DiariesProps {
    diariesList: NonSensitiveDiaryEntry[];
}

export type DiariesFormProps = {
    // setDiaries: Dispatch<SetStateAction<NonSensitiveDiaryEntry[]>>;
    notificationAlert: (message: string) => void;
};

export interface DiaryPartProps {
    individualDiary: NonSensitiveDiaryEntry;
}

export enum Weather {
    Sunny = "sunny",
    Rainy = "rainy",
    Cloudy = "cloudy",
    Stormy = "stormy",
    Windy = "windy",
}

export enum Visibility {
    Great = "great",
    Good = "good",
    Ok = "ok",
    Poor = "poor",
}

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
