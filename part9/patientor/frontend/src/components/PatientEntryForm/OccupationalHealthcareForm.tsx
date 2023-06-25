import { useState } from "react";
import { Diagnoses, NewPatientRecordEntry } from "../../types";
import patientService from "../../services/patients";
import { AxiosError } from "axios";

interface OccupationalHealthcareFormProps {
    patientId: string;
    showNotification: (type: string, message: string) => void;
    diagnosisCodes: Diagnoses[];
}

const OccupationalHealthcareForm = (props: OccupationalHealthcareFormProps) => {
    const [entryDate, setEntryDate] = useState("");
    const [entrySpecialist, setEntrySpecialist] = useState("");
    const [entryDiagnosisCode, setEntryDiagnosisCode] = useState("");
    const [entryEmployerName, setEntryEmployerName] = useState("");
    const [entryDiagnosisCodeList, setEntryDiagnosisCodeList] = useState<
        string[]
    >([]);
    const [entryDescription, setEntryDescription] = useState("");
    const [entrySickLeaveStartDate, setEntrySickLeaveStartDate] = useState("");
    const [entrySickLeaveEndDate, setEntrySickLeaveEndDate] = useState("");

    const addOccupationalHealthcareEntry = async (
        event: React.SyntheticEvent
    ) => {
        event.preventDefault();
        const newEntry: NewPatientRecordEntry = {
            type: "OccupationalHealthcare",
            date: entryDate,
            specialist: entrySpecialist,
            employerName: entryEmployerName,
            diagnosisCodes: entryDiagnosisCodeList,
            description: entryDescription,
            sickLeave: {
                startDate: entrySickLeaveStartDate,
                endDate: entrySickLeaveEndDate,
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
            <b>Occupational Healthcare Form</b>
            <form onSubmit={addOccupationalHealthcareEntry}>
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
                            <td>Employer*</td>
                            <td>
                                <input
                                    onChange={(e) => {
                                        setEntryEmployerName(e.target.value);
                                    }}
                                    type="text"
                                    value={entryEmployerName}
                                    placeholder="Employer"
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
                            <td>Sick Leave</td>
                        </tr>
                        <tr>
                            <td>
                                Start*
                                <input
                                    onChange={(e) => {
                                        setEntrySickLeaveStartDate(
                                            e.target.value
                                        );
                                    }}
                                    value={entrySickLeaveStartDate}
                                    type="date"
                                    placeholder="Start"
                                />
                            </td>
                            <td>
                                End*
                                <input
                                    onChange={(e) => {
                                        setEntrySickLeaveEndDate(
                                            e.target.value
                                        );
                                    }}
                                    value={entrySickLeaveEndDate}
                                    type="date"
                                    placeholder="End"
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

export default OccupationalHealthcareForm;
