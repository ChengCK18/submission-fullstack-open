// import { PatientsType } from "../types";
import patients from "../../data/patientsData";
import { NoSsnPatients, NewPatient, PatientsType } from "../types";

import { v1 as uuid } from "uuid";
// const getPatients = (): PatientsType[] => {
//     return patients;
// };

const getPatients = (): NoSsnPatients[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
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

export default {
    getPatients,
    addPatient,
};
