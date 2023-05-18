export interface PatientsType {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}
export interface DiagnosesType {
    code: string;
    name: string;
    latin?: string;
}

export type NoSsnPatients = Omit<PatientsType, "ssn">;

export type NewPatient = Omit<PatientsType, "id">;
