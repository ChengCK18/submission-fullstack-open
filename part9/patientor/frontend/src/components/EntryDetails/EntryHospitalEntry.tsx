import { HospitalEntry } from "../../types";

interface EntryHospitalEntryProps {
    entry: HospitalEntry;
}

const EntryHospitalEntry: React.FC<EntryHospitalEntryProps> = (props) => {
    return <div>{props.entry.specialist}</div>;
};

export default EntryHospitalEntry;
