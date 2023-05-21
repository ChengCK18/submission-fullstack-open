import { CoursePartListProps } from "../types";
import Part from "./Part";
const Content = (props: CoursePartListProps) => {
    console.log(props.courseParts);
    return (
        <div>
            {props.courseParts.map((item) => (
                <p key={item.name}>
                    <Part individualCourse={item} />
                </p>
            ))}
        </div>
    );
    // return <div></div>;
};

export default Content;
