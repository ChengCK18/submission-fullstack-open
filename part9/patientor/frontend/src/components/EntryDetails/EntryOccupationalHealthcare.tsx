import { OccupationalHealthcareEntry } from "../../types";

interface EntryOccupationalHealthCareProps {
    entry: OccupationalHealthcareEntry;
}

const EntryOccupationalHealthCare: React.FC<
    EntryOccupationalHealthCareProps
> = (props) => {
    const entry = props.entry;

    return <div>{entry.employerName}</div>;
};

export default EntryOccupationalHealthCare;
