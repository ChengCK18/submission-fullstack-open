import { useState } from "react";
import { Weather, Visibility } from "../types";
import diaryService from "../services/diaryServices";
import { DiariesFormProps } from "../types";
import { AxiosError } from "axios";

const DiaryForm = ({
    diaries,
    setDiaries,
    notificationAlert,
}: DiariesFormProps) => {
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
                try {
                    const response = await diaryService.addNewDiaryEntry(
                        object
                    );
                    const newDiariesList = [...diaries, response];
                    setDiaries(newDiariesList);
                } catch (err: unknown) {
                    if (err instanceof AxiosError) {
                        if (err.response) {
                            notificationAlert(err.response.data);
                        }
                    } else {
                        notificationAlert("Woops, something went wrong");
                    }
                }
            } else {
                notificationAlert(
                    "Weather and Visibility field needs to follow pre-defined set of values"
                );
            }
        } else {
            notificationAlert("You need to fill in all the entry field");
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
                                    placeholder="YYYY-MM-DD"
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
                                    placeholder="poor/ok/good/great"
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
                                    placeholder="windy/stormy/cloudy/rainy/sunny"
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
                                    placeholder="I'm feeling awesome"
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
