import { useState, useEffect } from "react";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import patientService from "../../services/patients";
import { Diagnoses } from "../../types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface PatientEntryFormProps {
    patientId: string;
    showNotification: (type: string, message: string) => void;
}

const PatientEntryForm = (props: PatientEntryFormProps) => {
    const [entryType, setEntryType] = useState("OccupationalHealthcare");
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnoses[]>([]);

    useEffect(() => {
        const fetchDiagnosisCodes = async () => {
            try {
                const result = await patientService.getDiagnoses();
                setDiagnosisCodes(result);
            } catch (error) {
                console.log("Failed to fetch diagnosis codes");
            }
        };

        fetchDiagnosisCodes();
    }, []);
    if (diagnosisCodes.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Patient Entry Form</h2>
            <div>
                <FormControl sx={{ mt: 1, width: 300 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                        Entry Type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={entryType}
                        label="Age"
                        onChange={(event) => {
                            setEntryType(event.target.value);
                        }}
                    >
                        <MenuItem value={"OccupationalHealthcare"}>
                            Occupational Healthcare
                        </MenuItem>
                        <MenuItem value={"Hospital"}>Hospital</MenuItem>
                        <MenuItem value={"HealthCheck"}>HealthCheck</MenuItem>
                    </Select>
                </FormControl>
                {entryType === "OccupationalHealthcare" && (
                    <OccupationalHealthcareForm
                        patientId={props.patientId}
                        showNotification={props.showNotification}
                        diagnosisCodes={diagnosisCodes}
                    />
                )}
                {entryType === "Hospital" && (
                    <HospitalForm
                        patientId={props.patientId}
                        showNotification={props.showNotification}
                        diagnosisCodes={diagnosisCodes}
                    />
                )}
                {entryType === "HealthCheck" && (
                    <HealthCheckForm
                        patientId={props.patientId}
                        showNotification={props.showNotification}
                    />
                )}
            </div>
        </div>
    );
};

export default PatientEntryForm;
