export interface HeaderProps {
    courseTitle: string;
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
    description: string;
    kind: "basic" | "background" | "special"; //only these kinds can have descriptions
}

export interface CoursePartBasic extends CoursePartDescription {
    kind: "basic";
}

export interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background";
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
}

export interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[];
    kind: "special";
}

export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial;

export interface CoursePartListProps {
    courseParts: CoursePart[];
}

export interface PartProps {
    individualCourse: CoursePart;
}

// export interface Course {
//     name: string;
//     exerciseCount: number;
// }
// export interface CoursePartsList {
//     courseParts: Course[];
// }
