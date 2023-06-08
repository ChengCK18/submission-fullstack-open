import { useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Patient } from "../types";
import patientService from "../services/patients";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { Table, TableCell, TableRow, TableBody } from "@mui/material";

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
                        <div>
                            <h4>
                                <b>{entry.date}</b>
                            </h4>
                        </div>
                        <div>{entry.description}</div>
                        <div>
                            {entry.diagnosisCodes?.map((diagnosis, index) => (
                                <li key={`diag${index}`}>{diagnosis}</li>
                            ))}
                        </div>
                        <Divider />
                    </div>
                ))}
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default PatientInfo;
