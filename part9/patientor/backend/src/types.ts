// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}
export interface PatientsType {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}
export interface DiagnosesType {
    code: string;
    name: string;
    latin?: string;
}

export type NonSensitivePatient = Omit<PatientsType, "ssn" | "entries">;

export type NoSsnPatients = Omit<PatientsType, "ssn">;

export type NewPatient = Omit<PatientsType, "id">;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}
