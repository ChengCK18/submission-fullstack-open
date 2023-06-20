import { useState } from "react";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
interface PatientEntryFormProps {
    patientId: string;
}

const PatientEntryForm = (props: PatientEntryFormProps) => {
    const [entryType, setEntryType] = useState("OccupationalHealthcare");

    return (
        <div>
            Patient Entry Form {props.patientId}
            <div>
                Type{"  "}
                <select
                    onChange={(event) => {
                        setEntryType(event.target.value);
                    }}
                >
                    <option value="OccupationalHealthcare">
                        Occupational Healthcare
                    </option>
                    <option value="Hospital">Hospital</option>
                    <option value="HealthCheck">HealthCheck</option>
                </select>
                {entryType === "OccupationalHealthcare" && (
                    <OccupationalHealthcareForm />
                )}
                {entryType === "Hospital" && (
                    <HospitalForm patientId={props.patientId} />
                )}
                {entryType === "HealthCheck" && <HealthCheckForm />}
            </div>
        </div>
    );
};

export default PatientEntryForm;
