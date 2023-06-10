import { Entry } from "../../types";
import EntryOccupationalHealthCare from "./EntryOccupationalHealthcare";
import EntryHospitalEntry from "./EntryHospitalEntry";
import EntryHealthCheck from "./EntryHealthCheck";
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (entry.type) {
        case "Hospital":
            return <EntryHospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <EntryOccupationalHealthCare entry={entry} />;
        case "HealthCheck":
            return <EntryHealthCheck entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
