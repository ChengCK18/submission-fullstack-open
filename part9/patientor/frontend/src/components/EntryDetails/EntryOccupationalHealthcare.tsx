import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";

interface EntryOccupationalHealthCareProps {
    entry: OccupationalHealthcareEntry;
}

const EntryOccupationalHealthCare: React.FC<
    EntryOccupationalHealthCareProps
> = (props) => {
    const entry = props.entry;

    return (
        <Box
            sx={{
                border: 2,
                borderColor: "black",
                borderRadius: "10px",
                padding: "10px",
                margin: "10px",
            }}
        >
            <WorkIcon /> {entry.employerName}
            <h3>{entry.date}</h3>
            <div>{entry.description}</div>
            <br />
            <div>
                <b>Diagnosed by: {entry.specialist}</b>
            </div>
        </Box>
    );
};

export default EntryOccupationalHealthCare;
