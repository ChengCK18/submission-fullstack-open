// import { PatientsType } from "../types";
import patients from "../../data/patientsData";
import { NoSsnPatients } from "../types";
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

export default {
    getPatients,
};
