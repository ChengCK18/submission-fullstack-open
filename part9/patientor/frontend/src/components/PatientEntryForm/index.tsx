import { useState } from "react";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import { Dispatch, SetStateAction } from "react";

interface PatientEntryFormProps {
    patientId: string;
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
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
                    <HospitalForm
                        patientId={props.patientId}
                        setReload={props.setReload}
                        reload={props.reload}
                    />
                )}
                {entryType === "HealthCheck" && <HealthCheckForm />}
            </div>
        </div>
    );
};

export default PatientEntryForm;
