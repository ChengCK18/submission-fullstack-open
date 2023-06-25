import { useState, useEffect, useRef } from "react";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";
import HealthCheckForm from "./HealthCheckForm";
import patientService from "../../services/patients";
import { Diagnoses } from "../../types";

interface PatientEntryFormProps {
    patientId: string;

    showNotification: (type: string, message: string) => void;
}

const PatientEntryForm = (props: PatientEntryFormProps) => {
    const [entryType, setEntryType] = useState("OccupationalHealthcare");
    const diagnosisCodesRef = useRef<Diagnoses[]>([]);

    useEffect(() => {
        const fetchDiagnosisCodes = async () => {
            try {
                const result = await patientService.getDiagnoses();
                diagnosisCodesRef.current = result;
            } catch (error) {
                console.log("Failed to fetch diagnosis codes");
            }
        };

        fetchDiagnosisCodes();
    }, []);

    return (
        <div>
            Patient Entry Form
            <div>
                Type
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
                        diagnosisCodes={diagnosisCodesRef.current}
                    />
                )}
                {entryType === "Hospital" && (
                    <HospitalForm
                        patientId={props.patientId}
                        showNotification={props.showNotification}
                        diagnosisCodes={diagnosisCodesRef.current}
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
