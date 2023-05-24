import { DiaryPartProps } from "../types";
const DiaryPart = (props: DiaryPartProps) => {
    const indivDiary = props.individualDiary;
    return (
        <div>
            <h3>{indivDiary.date}</h3>
            <b>Visibility:</b> {indivDiary.visibility}
            <br />
            <b>Weather:</b> {indivDiary.weather}
        </div>
    );
};

export default DiaryPart;
