// import { PatientsType } from "../types";
// import patients from "../../data/patientsData";
import patients from "../../data/patients-full";
import {
    NoSsnPatients,
    NewPatient,
    PatientsType,
    NewPatientRecordEntry,
} from "../types";
import { v1 as uuid } from "uuid";
// const getPatients = (): PatientsType[] => {
//     return patients;
// };

const getPatients = (): NoSsnPatients[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
            id,
            name,
            dateOfBirth,
            entries: entries,
            gender,
            occupation,
        })
    );
};

const getSpecificPatient = (patientId: string) => {
    return patients.find((pat) => pat.id === patientId);
};

const addPatient = (entry: NewPatient): PatientsType => {
    const newId: string = uuid();
    const newPatientEntry = {
        id: newId,
        ...entry,
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addPatientEntry = (
    entry: NewPatientRecordEntry,
    patientId: string
): PatientsType | undefined => {
    const newId: string = uuid();

    const newPatientEntry = {
        id: newId,
        ...entry,
    };

    const patient = getSpecificPatient(patientId);
    if (patient) {
        patient.entries.push(newPatientEntry);
        return patient;
    } else {
        return undefined;
    }

    // switch (entry.type) {
    //     case "OccupationalHealthcare":
    //         console.log("OccupationalHealthcare");
    //         break;
    //     case "Hospital":
    //         console.log("Hospital");
    //         break;
    //     case "HealthCheck":
    //         console.log("HealthCheck");
    //         break;
    //     default:
    //         console.log("Invalid entry type");
    //         break;
    // }
};

export default {
    getPatients,
    addPatient,
    getSpecificPatient,
    addPatientEntry,
};
