import { PartProps } from "../types";

const Part = (props: PartProps) => {
    const coursePart = props.individualCourse;
    const assertNever = (value: never): never => {
        //type never for unexpected value in exhaustive type checking
        // if one of the case were to be removed, the default case will alert stating that particular case cannot be assigned to 'never' type
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (coursePart.kind) {
        case "basic":
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                    </p>
                    <p>
                        <i>{coursePart.description}</i>
                    </p>
                </div>
            );

        case "background":
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                    </p>

                    <p>
                        <i>{coursePart.description}</i>
                    </p>
                    <p>Submit to {coursePart.backgroundMaterial}</p>
                </div>
            );

        case "group":
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                    </p>

                    <p>Project exercises = {coursePart.groupProjectCount}</p>
                </div>
            );

        case "special":
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                    </p>
                    <p>
                        <i>{coursePart.description}</i>
                    </p>

                    <p>
                        Required skills ={" "}
                        {coursePart.requirements.map((item) => (
                            <span key={item}>{item}, </span>
                        ))}
                    </p>
                </div>
            );

        default:
            return assertNever(coursePart);
    }
};

export default Part;
