/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";
import { NewPatient } from "../types";
// import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientsService.getPatients());
});

router.post("/", (req, res) => {
    try {
        // const newPatientEntry = toNewPatientEntry(req.body);

        const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const dataInput = {
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation,
        } as NewPatient;
        const addedPatientEntry = patientsService.addPatient(dataInput);
        res.json(addedPatientEntry);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
