import { useState } from "react";
import { Weather, Visibility } from "../types";
import { DiariesFormProps } from "../types";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { addNewDiaryEntry } from "../services/diaryServices";

const DiaryForm = ({ notificationAlert }: DiariesFormProps) => {
    const [date, setDate] = useState<string>("");
    const [visibility, setVisibility] = useState<Visibility>();
    const [weather, setWeather] = useState<Weather>();
    const [comment, setComment] = useState<string>("");
    const queryClient = useQueryClient();
    const newDiaryMutation = useMutation(addNewDiaryEntry, {
        onSuccess: () => {
            queryClient.invalidateQueries("diaries");
        },
    });

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
                    newDiaryMutation.mutate(object);
                    setDate("");
                    setComment("");
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
                                    value={date}
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="ui header">Visibility</td>
                            <td>
                                <input
                                    type="radio"
                                    id="visibility1"
                                    name="visibility"
                                    value="poor"
                                    onChange={() =>
                                        setVisibility(Visibility.Poor)
                                    }
                                />
                                <label htmlFor="visibility1">poor</label>
                                <input
                                    type="radio"
                                    id="visibility2"
                                    name="visibility"
                                    value="ok"
                                    onChange={() =>
                                        setVisibility(Visibility.Ok)
                                    }
                                />
                                <label htmlFor="visibility2">ok</label>
                                <input
                                    type="radio"
                                    id="visibility3"
                                    name="visibility"
                                    value="good"
                                    onChange={() =>
                                        setVisibility(Visibility.Good)
                                    }
                                />
                                <label htmlFor="visibility3">good</label>

                                <input
                                    type="radio"
                                    id="visibility4"
                                    name="visibility"
                                    value="great"
                                    onChange={() =>
                                        setVisibility(Visibility.Great)
                                    }
                                />
                                <label htmlFor="visibility4">great</label>
                            </td>
                        </tr>
                        <tr>
                            <td className="ui header">Weather</td>
                            <td>
                                <input
                                    type="radio"
                                    id="weather1"
                                    name="weather"
                                    value="windy"
                                    onChange={() => setWeather(Weather.Windy)}
                                />
                                <label htmlFor="weather1">windy</label>
                                <input
                                    type="radio"
                                    id="weather2"
                                    name="weather"
                                    value="stormy"
                                    onChange={() => setWeather(Weather.Stormy)}
                                />
                                <label htmlFor="weather2">stormy</label>
                                <input
                                    type="radio"
                                    id="weather3"
                                    name="weather"
                                    value="cloudy"
                                    onChange={() => setWeather(Weather.Cloudy)}
                                />
                                <label htmlFor="weather3">cloudy</label>
                                <input
                                    type="radio"
                                    id="weather4"
                                    name="weather"
                                    value="rainy"
                                    onChange={() => setWeather(Weather.Rainy)}
                                />
                                <label htmlFor="weather4">rainy</label>
                                <input
                                    type="radio"
                                    id="weather5"
                                    name="weather"
                                    value="sunny"
                                    onChange={() => setWeather(Weather.Sunny)}
                                />
                                <label htmlFor="weather5">sunny</label>
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
                                    value={comment}
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
