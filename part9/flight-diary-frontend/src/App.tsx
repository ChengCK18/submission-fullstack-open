import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import "./App.css";
import diaryService from "./services/diaryServices";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";

const App = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
    const [notification, setNotification] = useState<string>("");

    useEffect(() => {
        diaryService
            .getAllNonSensitiveDiaries()
            .then((nonSensiteResult) => {
                console.log(nonSensiteResult);
                setDiaries(nonSensiteResult);
            })
            .catch((error) => {
                setNotification(error.message);
            });
    }, []);

    const notificationAlert = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification("");
        }, 5000);
    };

    if (!diaries) {
        if (notification) {
            return <div>{notification}</div>;
        }
        return <div>Retrieving data from server...</div>;
    }

    return (
        <div>
            {notification === "" ? (
                ""
            ) : (
                <span className="errorText">{notification}</span>
            )}

            <DiaryForm
                diaries={diaries}
                setDiaries={setDiaries}
                notificationAlert={notificationAlert}
            />
            <Diaries diariesList={diaries} />
        </div>
    );
};

export default App;
