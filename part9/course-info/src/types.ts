export interface HeaderProps {
    courseTitle: string;
}

export interface Course {
    name: string;
    exerciseCount: number;
}
export interface CoursePartsList {
    courseParts: Course[];
}
