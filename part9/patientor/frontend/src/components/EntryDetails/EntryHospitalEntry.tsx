import { HospitalEntry } from "../../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import Box from "@mui/material/Box";

interface EntryHospitalEntryProps {
    entry: HospitalEntry;
}

const EntryHospitalEntry: React.FC<EntryHospitalEntryProps> = (props) => {
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
            <HealthAndSafetyIcon />
            <h3>{entry.date}</h3>
            <div>{entry.description}</div>
            <br />

            <LogoutSharpIcon style={{ fill: "green" }} />
            <div>
                Discharged:
                {entry.discharge.date}
            </div>
            <div>
                Reason:
                {entry.discharge.criteria}
            </div>
            <br />
            <div>
                <b>Diagnosed by: {entry.specialist}</b>
            </div>
        </Box>
    );
};

export default EntryHospitalEntry;
