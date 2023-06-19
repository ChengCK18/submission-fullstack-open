// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
    | OccupationalHealthcareEntry
    | HospitalEntry
    | HealthCheckEntry;

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
    diagnosisCodes?: Array<DiagnosesType["code"]>;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
    diagnosisCodes?: Array<DiagnosesType["code"]>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

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

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
    ? Omit<T, K>
    : never;
// Define Entry without the 'id' property
export type NewPatientRecordEntry = UnionOmit<Entry, "id">;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}
