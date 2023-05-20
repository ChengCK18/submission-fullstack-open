import { CoursePartsList } from "../types";

const Content = (props: CoursePartsList) => {
    return (
        <div>
            {props.courseParts.map((item) => (
                <p key={item.name}>
                    {item.name} {item.exerciseCount}
                </p>
            ))}
        </div>
    );
};

export default Content;
