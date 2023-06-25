import { useState } from "react";
import patientService from "../../services/patients";
import { NewPatientRecordEntry, Diagnoses } from "../../types";
import { AxiosError } from "axios";
import DiagnosisCodeMultipleSelect from "./DiagnosisCodeEntry";
interface HospitalFormProps {
    patientId: string;
    showNotification: (type: string, message: string) => void;
    diagnosisCodes: Diagnoses[];
}

const HospitalForm = (props: HospitalFormProps) => {
    const [entryDate, setEntryDate] = useState("");
    const [entrySpecialist, setEntrySpecialist] = useState("");
    const [entryDiagnosisCode, setEntryDiagnosisCode] = useState<string[]>([]);

    const [entryDescription, setEntryDescription] = useState("");
    const [entryDischargeDate, setEntryDischargeDate] = useState("");
    const [entryDischargeCriteria, setEntryDischargeCriteria] = useState("");

    const addHospitalEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry: NewPatientRecordEntry = {
            type: "Hospital",
            date: entryDate,
            specialist: entrySpecialist,
            diagnosisCodes: entryDiagnosisCode,
            description: entryDescription,
            discharge: {
                date: entryDischargeDate,
                criteria: entryDischargeCriteria,
            },
        };
        try {
            const data = await patientService.addPatientEntry(
                newEntry,
                props.patientId
            );

            props.showNotification(
                "success",
                `Entry successfully added to patient record. ${data.id}`
            );
            // props.setReload(!props.reload);
        } catch (error) {
            let errorMessage = "Entry failed due to missing field";
            if (error instanceof AxiosError) {
                errorMessage = error.response?.data;
                props.showNotification("error", errorMessage);
            }

            console.log(errorMessage);
        }
    };

    return (
        <div>
            <form onSubmit={addHospitalEntry}>
                <DiagnosisCodeMultipleSelect
                    diagnosisCodes={props.diagnosisCodes}
                    entryDiagnosisCode={entryDiagnosisCode}
                    setEntryDiagnosisCode={setEntryDiagnosisCode}
                />
                <table>
                    <tbody>
                        <tr>
                            <td>Date*</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setEntryDate(e.target.value);
                                    }}
                                    value={entryDate}
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Specialist*</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setEntrySpecialist(e.target.value);
                                    }}
                                    type="text"
                                    value={entrySpecialist}
                                    placeholder="Specialist"
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Description*</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setEntryDescription(e.target.value);
                                    }}
                                    type="text"
                                    value={entryDescription}
                                    placeholder="Description"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Discharge*</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setEntryDischargeDate(e.target.value);
                                    }}
                                    value={entryDischargeDate}
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                />
                            </td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setEntryDischargeCriteria(
                                            e.target.value
                                        );
                                    }}
                                    type="text"
                                    value={entryDischargeCriteria}
                                    placeholder="Discharge criteria..."
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Add entry</button>
            </form>
        </div>
    );
};

export default HospitalForm;
