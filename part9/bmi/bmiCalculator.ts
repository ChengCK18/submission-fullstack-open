// import { bmiParseArgs } from "./utils";
export const bmiCalculator = (height: Number, weight: Number) => {
    if (typeof height === "number" && typeof weight === "number") {
        const heightInMeter = height / 100;
        const bmi = weight / heightInMeter ** 2;

        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi < 25) {
            return "Normal (healthy weight)";
        } else if (bmi < 30) {
            return "Overweight";
        } else {
            return "Obese";
        }
    } else {
        return "Both height(cm) and weight(kg) needs be numbers";
    }
};

// try {
//     const { height, weight } = bmiParseArgs(process.argv);
//     console.log(bmiCalculator(height, weight));
// } catch (error: unknown) {
//     let errorMessage = "Something bad happened.";
//     if (error instanceof Error) {
//         errorMessage += " Error: " + error.message;
//     }
//     console.log(errorMessage);
// }
