import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
    console.log(req.params.id);
    if (req.params.id) {
        const result = patientsService.getSpecificPatient(req.params.id);

        if (result !== undefined) {
            res.send(result);
        } else {
            res.status(204).end();
        }
    }

    res.status(400).end();
});

router.post("/", (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatientEntry = patientsService.addPatient(newPatientEntry);
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
