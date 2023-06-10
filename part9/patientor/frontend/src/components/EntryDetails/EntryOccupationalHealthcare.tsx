import { OccupationalHealthcareEntry } from "../../types";

interface EntryOccupationalHealthCareProps {
    entry: OccupationalHealthcareEntry;
}

const EntryOccupationalHealthCare = (
    props: EntryOccupationalHealthCareProps
) => {
    const entry = props.entry;

    return <div>{entry.employerName}</div>;
};

export default EntryOccupationalHealthCare;
