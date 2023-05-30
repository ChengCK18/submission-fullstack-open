import "./App.css";
import { useState } from "react";
import Diaries from "./components/Diaries";
import DiaryForm from "./components/DiaryForm";
import { useQuery } from "react-query";
import { getAllNonSensitiveDiaries } from "./services/diaryServices";

const App = () => {
    const [notification, setNotification] = useState<string>("");
    const result = useQuery("diaries", getAllNonSensitiveDiaries);
    const notificationAlert = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification("");
        }, 5000);
    };

    if (result.isLoading) {
        return <div>Retrieving list of diaries entries...</div>;
    }

    const diaries = result.data;

    if (diaries === undefined) {
        return <div>Something went wrong</div>;
    }

    return (
        <div>
            {notification === "" ? (
                ""
            ) : (
                <span className="errorText">{notification}</span>
            )}

            <DiaryForm notificationAlert={notificationAlert} />
            <Diaries diariesList={diaries} />
        </div>
    );
};

export default App;
