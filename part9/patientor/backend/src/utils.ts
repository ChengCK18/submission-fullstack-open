import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseNameOccSsn = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }

    return name;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Incorrect or missing date: " + dateOfBirth);
    }
    return dateOfBirth;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender)
        .map((v) => v.toString())
        .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

const toNewPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing gender");
    }

    if (
        "name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object
    ) {
        const newPatient: NewPatient = {
            name: parseNameOccSsn(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseNameOccSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseNameOccSsn(object.occupation),
        };

        return newPatient;
    }
    throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
