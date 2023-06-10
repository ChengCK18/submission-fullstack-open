import { HospitalEntry } from "../../types";

interface EntryHospitalEntryProps {
    entry: HospitalEntry;
}

const EntryHospitalEntry = (props: EntryHospitalEntryProps) => {
    return <div>{props.entry.specialist}</div>;
};

export default EntryHospitalEntry;
