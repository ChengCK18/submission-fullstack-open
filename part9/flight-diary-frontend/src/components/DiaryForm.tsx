import { useState } from "react";
import { Weather, Visibility } from "../types";
import diaryService from "../services/diaryServices";
import { DiariesFormProps } from "../types";

const DiaryForm = ({ diaries, setDiaries }: DiariesFormProps) => {
    const [date, setDate] = useState<string>("");
    const [visibility, setVisibility] = useState<Visibility>();
    const [weather, setWeather] = useState<Weather>();
    const [comment, setComment] = useState<string>("");

    const addDiary = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (date && visibility && weather && comment) {
            if (
                Object.values(Weather).includes(weather) &&
                Object.values(Visibility).includes(visibility)
            ) {
                const object = {
                    date,
                    visibility,
                    weather,
                    comment,
                };
                const response = await diaryService.addNewDiaryEntry(object);
                const newDiariesList = [...diaries, response];
                setDiaries(newDiariesList);
            } else {
                alert("AHHHHHH");
            }
        }
    };

    return (
        <div>
            <h2>Add new diary entry</h2>
            <form onSubmit={addDiary}>
                <table>
                    <tbody>
                        <tr>
                            <td className="ui header">Date</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="date"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="ui header">Visibility</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setVisibility(
                                            e.target.value as Visibility
                                        ); //type assert, to check onsubmit
                                    }}
                                    type="text"
                                    placeholder="visibility"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="ui header">Weather</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setWeather(e.target.value as Weather); //type assert, to check onsubmit
                                    }}
                                    type="text"
                                    placeholder="weather"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="ui header">Comment</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                    type="text"
                                    placeholder="comment"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default DiaryForm;
