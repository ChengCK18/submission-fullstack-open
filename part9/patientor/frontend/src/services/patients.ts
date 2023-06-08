import axios from "axios";
import { Diagnoses, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
    return data;
};

const getDiagnoses = async () => {
    const { data } = await axios.get<Diagnoses[]>(`${apiBaseUrl}/diagnoses`);
    return data;
};

const getSpecificPatient = async (patientId: string) => {
    const { data } = await axios.get(`${apiBaseUrl}/patients/${patientId}`);
    return data;
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        object
    );

    return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    create,
    getSpecificPatient,
    getDiagnoses,
};
