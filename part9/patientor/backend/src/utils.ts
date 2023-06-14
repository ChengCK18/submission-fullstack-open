import { NewPatient, Gender } from "./types";
import { NewPatientRecordEntry, DiagnosesType } from "./types";

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
        throw new Error("object is not defined");
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
            entries: [],
            gender: parseGender(object.gender),
            occupation: parseNameOccSsn(object.occupation),
        };

        return newPatient;
    }
    throw new Error("Incorrect data: some fields are missing");
};
export default toNewPatientEntry;

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist");
    }
    return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employerName");
    }
    return employerName;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosesType["code"]> => {
    if (
        !object ||
        typeof object !== "object" ||
        !("diagnosisCodes" in object)
    ) {
        // we will just trust the data to be in correct form
        return [] as Array<DiagnosesType["code"]>;
    }

    return object.diagnosisCodes as Array<DiagnosesType["code"]>;
};

const toNewPatientRecordEntry = (object: unknown): NewPatientRecordEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Object is not defined");
    }
    if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "diagnosisCodes" in object &&
        "type" in object
    ) {
        switch (object.type) {
            case "OccupationalHealthcare":
                if ("employerName" in object) {
                    const newPatientRecord: NewPatientRecordEntry = {
                        type: object.type,
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(
                            object.diagnosisCodes
                        ),
                        employerName: parseEmployerName(object.employerName),
                    };

                    if (
                        "sickLeave" in object &&
                        typeof object.sickLeave === "object" &&
                        object.sickLeave &&
                        "startDate" in object.sickLeave &&
                        "endDate" in object.sickLeave
                    ) {
                        newPatientRecord.sickLeave = {
                            startDate: parseDate(object.sickLeave.startDate),
                            endDate: parseDate(object.sickLeave.endDate),
                        };
                    }
                    return newPatientRecord;
                } else {
                    throw new Error(
                        `OccupationalHealthcare 'employerName' needs to be defined`
                    );
                }

                break;
            case "Hospital":
                console.log("Hospital");
                break;
            case "HealthCheck":
                console.log("HealthCheck");
                break;
            default:
                throw new Error(`Type ${object.type} is invalid`);
                break;
        }
    }
};
