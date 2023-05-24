import { DiariesProps } from "../types";
import DiaryPart from "./DiaryPart";
const Diaries = (props: DiariesProps) => {
    return (
        <div>
            <h1>Diary entries</h1>
            {props.diariesList.map((item) => {
                return (
                    <div key={item.id}>
                        <DiaryPart individualDiary={item} />
                    </div>
                );
            })}
        </div>
    );
};

export default Diaries;
