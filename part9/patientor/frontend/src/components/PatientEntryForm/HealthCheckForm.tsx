import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { NewPatientRecordEntry } from "../../types";
import { HealthCheckRating } from "../../types";
import patientService from "../../services/patients";

interface HealthCheckFormProps {
    patientId: string;
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
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
        const data = await patientService.addPatientEntry(
            newEntry,
            props.patientId
        );

        props.setReload(!props.reload);
    };

    return (
        <div>
            HealthCheckForm Form Hospital Form
            <form onSubmit={addHealthCheckEntry}>
                <table>
                    <tbody>
                        <tr>
                            <td>Date</td>
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
                            <td>Specialist</td>
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
                            <td>Description</td>
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
                            <td>Health Check Rating</td>
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
