import { useState } from "react";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";

interface PatientEntryFormProps {
    patientId: string;

    showNotification: (type: string, message: string) => void;
}

const PatientEntryForm = (props: PatientEntryFormProps) => {
    const [entryType, setEntryType] = useState("OccupationalHealthcare");

    return (
        <div>
            Patient Entry Form
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
                    <OccupationalHealthcareForm
                        patientId={props.patientId}
                        showNotification={props.showNotification}
                    />
                )}
                {entryType === "Hospital" && (
                    <HospitalForm
                        patientId={props.patientId}
                        showNotification={props.showNotification}
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
