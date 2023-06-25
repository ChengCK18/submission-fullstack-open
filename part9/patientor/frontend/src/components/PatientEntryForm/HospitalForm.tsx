import { useState } from "react";
import patientService from "../../services/patients";
import { NewPatientRecordEntry, Diagnoses } from "../../types";
import { AxiosError } from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface HospitalFormProps {
    patientId: string;
    showNotification: (type: string, message: string) => void;
    diagnosisCodes: Diagnoses[];
}

const HospitalForm = (props: HospitalFormProps) => {
    const [entryDate, setEntryDate] = useState("");
    const [entrySpecialist, setEntrySpecialist] = useState("");
    const [entryDiagnosisCode, setEntryDiagnosisCode] = useState("");
    const [entryDiagnosisCodeList, setEntryDiagnosisCodeList] = useState<
        string[]
    >([]);
    const [entryDescription, setEntryDescription] = useState("");
    const [entryDischargeDate, setEntryDischargeDate] = useState("");
    const [entryDischargeCriteria, setEntryDischargeCriteria] = useState("");

    const addHospitalEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry: NewPatientRecordEntry = {
            type: "Hospital",
            date: entryDate,
            specialist: entrySpecialist,
            diagnosisCodes: entryDiagnosisCodeList,
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
            <b>Hospital Form</b>
            <form onSubmit={addHospitalEntry}>
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
                            <td>Diagnosis code</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setEntryDiagnosisCode(e.target.value);
                                    }}
                                    type="text"
                                    value={entryDiagnosisCode}
                                    placeholder="Diagnosis code"
                                />
                                <button
                                    onClick={() => {
                                        let newList = entryDiagnosisCodeList;
                                        newList.push(entryDiagnosisCode);

                                        console.log("yeah", newList);
                                        setEntryDiagnosisCodeList(newList);
                                        setEntryDiagnosisCode("");
                                    }}
                                    type="button"
                                >
                                    Add code
                                </button>
                            </td>
                            <td>
                                {entryDiagnosisCodeList.map((item) => (
                                    <span key={`diagCode_${item}`}>
                                        {item}{" "}
                                    </span>
                                ))}
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
