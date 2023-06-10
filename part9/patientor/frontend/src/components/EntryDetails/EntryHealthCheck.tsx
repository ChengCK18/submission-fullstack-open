import { HealthCheckEntry } from "../../types";

interface EntryHealthCheckProps {
    entry: HealthCheckEntry;
}

const EntryHealthCheck = (props: EntryHealthCheckProps) => {
    const entry = props.entry;
    return <div>{entry.healthCheckRating}</div>;
};

export default EntryHealthCheck;
