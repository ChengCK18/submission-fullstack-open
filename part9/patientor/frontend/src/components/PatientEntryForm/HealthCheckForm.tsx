import { useState } from "react";
import { NewPatientRecordEntry } from "../../types";
import { HealthCheckRating } from "../../types";
import patientService from "../../services/patients";
import { AxiosError } from "axios";
interface HealthCheckFormProps {
    patientId: string;

    showNotification: (type: string, message: string) => void;
}

const HealthCheckForm = (props: HealthCheckFormProps) => {
    const [entryDate, setEntryDate] = useState("");
    const [entrySpecialist, setEntrySpecialist] = useState("");

    const [entryDescription, setEntryDescription] = useState("");
    const [entryHealthRating, setEntryHealthRating] =
        useState<HealthCheckRating>(HealthCheckRating.HighRisk);

    const addHealthCheckEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newEntry: NewPatientRecordEntry = {
            type: "HealthCheck",
            date: entryDate,
            specialist: entrySpecialist,
            description: entryDescription,
            healthCheckRating: entryHealthRating,
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
            <form onSubmit={addHealthCheckEntry}>
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
                            <td>Health Check Rating*</td>
                            <td>
                                <input
                                    type="radio"
                                    id="healthcheck0"
                                    name="healthcheck"
                                    value="0"
                                    onChange={() =>
                                        setEntryHealthRating(
                                            HealthCheckRating.Healthy
                                        )
                                    }
                                />
                                <label htmlFor="healthcheck0">Healthy</label>

                                <input
                                    type="radio"
                                    id="healthcheck1"
                                    name="healthcheck"
                                    value="1"
                                    onChange={() =>
                                        setEntryHealthRating(
                                            HealthCheckRating.LowRisk
                                        )
                                    }
                                />
                                <label htmlFor="healthcheck1">Low</label>
                                <input
                                    type="radio"
                                    id="healthcheck2"
                                    name="healthcheck"
                                    value="2"
                                    onChange={() =>
                                        setEntryHealthRating(
                                            HealthCheckRating.HighRisk
                                        )
                                    }
                                />
                                <label htmlFor="healthcheck2">High</label>

                                <input
                                    type="radio"
                                    id="healthcheck3"
                                    name="healthcheck"
                                    value="3"
                                    onChange={() =>
                                        setEntryHealthRating(
                                            HealthCheckRating.CriticalRisk
                                        )
                                    }
                                />
                                <label htmlFor="healthcheck3">Critical</label>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">Add entry</button>
            </form>
        </div>
    );
};

export default HealthCheckForm;
