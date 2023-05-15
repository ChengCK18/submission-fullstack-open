// import { execiseCalcParseArgs } from "./utils";
export interface exerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const exerciseCalculator = (
    dailyNumbers: number[],
    target: number
): exerciseResult | string => {
    const periodLength = dailyNumbers.length;
    const trainingDays = dailyNumbers.filter((item) => item > 0).length;
    const total = dailyNumbers.reduce((sum, num) => sum + num, 0);
    const average = total / periodLength;
    const success = average >= target ? true : false;

    let review = null;
    const difference = average - target;
    if (difference == 0) {
        review = {
            rating: 2,
            message: "Well done, you have met your target",
        };
    } else if (difference > 0) {
        review = {
            rating: 3,
            message: "Great, you have exceeded your target",
        };
    } else {
        review = {
            rating: 1,
            message: "You have not met your target, but amazing effort",
        };
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: review.rating,
        ratingDescription: review.message,
        target: target,
        average: average,
    };
};

// try {
//     const { userExercise, userTarget } = execiseCalcParseArgs(process.argv);
//     console.log(exerciseCalculator(userExercise, userTarget));
// } catch (error) {
//     let errorMessage = "Something bad happened.";
//     if (error instanceof Error) {
//         errorMessage += " Error: " + error.message;
//     }
//     console.log(errorMessage);
// }
