import express from "express";
import { bmiCalculator } from "./bmiCalculator";
const app = express();

app.get("/hello", (_, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    let { weight, height } = req.query;
    const w = Number(weight);
    const h = Number(height);
    if (
        weight === undefined ||
        height === undefined ||
        Number.isNaN(w) ||
        Number.isNaN(h)
    ) {
        res.send({
            error: "malformatted parameters",
        });
        return;
    }

    const result = bmiCalculator(h, w);
    const response = {
        weight: w,
        height: h,
        bmi: result,
    };
    res.send(response);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
