import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";
// import { exerciseResult } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const { weight, height } = req.query;
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

app.post("/calculate", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (!req.body) {
        return res.status(400).send({ error: "request body is undefined" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    const dailyExerciseValues = daily_exercises as number[];
    const targetValue = target as number;

    if (!target || isNaN(Number(target))) {
        return res.status(400).send({
            error: "malformatted parameters: target number needs to be a number and defined",
        });
    }

    const allNumbers: boolean = dailyExerciseValues.every(
        (num: number) => typeof num === "number"
    );

    if (daily_exercises === undefined || !allNumbers) {
        return res.status(400).send({
            error: "malformatted parameters: daily_exercises needs to be all of number type and defined",
        });
    }

    const result = exerciseCalculator(dailyExerciseValues, targetValue);

    return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
