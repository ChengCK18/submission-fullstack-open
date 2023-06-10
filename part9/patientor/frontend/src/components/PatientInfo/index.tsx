import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient, Diagnoses } from "../../types";
import patientService from "../../services/patients";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    Chip,
    Divider,
} from "@mui/material";

import EntryDetails from "../EntryDetails";

const PatientInfo = () => {
    const [patientInfo, setPatientInfo] = useState<Patient | undefined>();
    const [diagnosesDesc, setDianosesDesc] = useState<
        Diagnoses[] | undefined
    >();

    const [notification, setNotification] = useState<string>();
    const match = useMatch("/:id");

    useEffect(() => {
        getPatientInfo();
        getDiagnosesInit();
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

    const getDiagnosesInit = async () => {
        try {
            const data = await patientService.getDiagnoses();
            setDianosesDesc(data);
        } catch (error) {}
    };

    const getDiagnosesDesc = (diagnosesCode: string) => {
        const diag = diagnosesDesc?.find((item) => item.code === diagnosesCode);
        if (diag) {
            return diag.name;
        } else {
            return "NA";
        }
    };

    if (notification) {
        return <div>{notification}</div>;
    }

    if (patientInfo !== undefined) {
        console.log(patientInfo.entries);
        return (
            <div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell variant="head">
                                <b>Name</b>
                            </TableCell>
                            <TableCell>{patientInfo.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">
                                <b>Gender</b>
                            </TableCell>
                            <TableCell>{patientInfo.gender}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">
                                <b>SSN</b>
                            </TableCell>
                            <TableCell>{patientInfo.ssn}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">
                                <b>Occupation</b>
                            </TableCell>
                            <TableCell>{patientInfo.occupation}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <br />
                <br />
                <br />
                <Divider>
                    <Chip label="ENTRIES" />
                </Divider>

                {patientInfo.entries.map((entry, index) => (
                    <div key={index}>
                        <EntryDetails
                            entry={entry}
                            getDiagnosesDesc={getDiagnosesDesc}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default PatientInfo;
