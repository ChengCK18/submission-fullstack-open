import axios from "axios";
import {
    Diagnoses,
    Patient,
    PatientFormValues,
    NewPatientRecordEntry,
    Entry,
} from "../types";

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

const addPatientEntry = async (
    object: NewPatientRecordEntry,
    patientId: string
) => {
    const { data } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        object
    );
    return data;
};

const patientService = {
    getAll,
    create,
    getSpecificPatient,
    getDiagnoses,
    addPatientEntry,
};

export default patientService;
