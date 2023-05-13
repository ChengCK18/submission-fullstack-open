interface bmiValues {
  height: number;
  weight: number;
}

interface exerciseResult {
  userExercise: number[];
  userTarget: number;
}

export const isAllNumberArray = (arr: any[]): boolean => {
  return arr.every((item) => typeof item === "number");
};

export const execiseCalcParseArgs = (args: string[]): exerciseResult => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const argLength = process.argv.length;
  const userTarget = Number(process.argv[2]);
  let userExercise: number[] = [];

  for (let i = 3; i < argLength; i++) {
    const parsedHours = Number(process.argv[i]);
    if (isNaN(parsedHours)) {
      throw new Error("One of the hours is not in number format");
    }
    userExercise.push(parsedHours);
  }
  if (typeof userTarget !== "number" || isNaN(userTarget)) {
    throw new Error("Target value needs to be in number format");
  }

  return {
    userExercise: userExercise,
    userTarget: userTarget,
  };
};

export const bmiParseArgs = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
