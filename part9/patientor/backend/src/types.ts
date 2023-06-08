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
    diagnosisCodes?: Array<DiagnosesType["code"]>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
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

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}
