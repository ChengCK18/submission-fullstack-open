import { useMatch } from "react-router-dom";

import patientService from "../services/patients";
import { useEffect, useState } from "react";
import { Patient } from "../types";

const PatientInfo = () => {
    const [patientInfo, setPatientInfo] = useState<Patient | undefined>();
    const [notification, setNotification] = useState<string>();
    const match = useMatch("/:id");

    useEffect(() => {
        getPatientInfo();
    }, []);

    const getPatientInfo = async () => {
        if (
            match !== undefined &&
            match !== null &&
            match.params.id !== undefined
        ) {
            try {
                const data = await patientService.getSpecificPatient(
                    match.params.id
                );
                setPatientInfo(data);
            } catch (error) {
                setNotification("Error: Server is offline :(");
            }
        }
    };

    if (notification) {
        return <div>{notification}</div>;
    }

    if (patientInfo !== undefined) {
        return (
            <div>
                <article>
                    <p>Name:{patientInfo.name}</p>
                </article>
                <article>
                    <p>SSN:{patientInfo.ssn}</p>
                </article>
                <article>
                    <p>Occupation:{patientInfo.occupation}</p>
                </article>
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default PatientInfo;
