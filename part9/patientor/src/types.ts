export interface PatientsType {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}
export interface DiagnosesType {
    code: string;
    name: string;
    latin?: string;
}

export type NoSsnPatients = Omit<PatientsType, "ssn">;

export type NewPatient = Omit<PatientsType, "id">;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}
