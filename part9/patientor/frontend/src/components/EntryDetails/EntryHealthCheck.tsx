import { HealthCheckEntry } from "../../types";

interface EntryHealthCheckProps {
    entry: HealthCheckEntry;
}

const EntryHealthCheck: React.FC<EntryHealthCheckProps> = (props) => {
    const entry = props.entry;
    return <div>{entry.healthCheckRating}</div>;
};

export default EntryHealthCheck;
