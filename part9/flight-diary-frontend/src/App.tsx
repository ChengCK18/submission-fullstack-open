import { useEffect, useState } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import diaryService from "./services/diaryServices";
import Diaries from "./components/Diaries";
const App = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>();
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

    if (!diaries) {
        if (notification) {
            return <div>{notification}</div>;
        }
        return <div>Retrieving data from server...</div>;
    }
    return (
        <div>
            <Diaries diariesList={diaries} />
        </div>
    );
};

export default App;
