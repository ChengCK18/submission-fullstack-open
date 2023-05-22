import { CoursePartListProps } from "../types";

const Total = (props: CoursePartListProps) => {
    return (
        <div>
            <br />
            <p>
                <b>
                    Number of exercises{" "}
                    {props.courseParts.reduce(
                        (carry, part) => carry + part.exerciseCount,
                        0
                    )}
                </b>
            </p>
        </div>
    );
};
export default Total;
