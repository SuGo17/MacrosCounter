const macrosCalories = { protein: 4, carbohydrates: 4, fat: 9, fiber: 2 };

export const calcKcal = (macro) => {
  let kcal = 0;
  Object.keys(macrosCalories).forEach((ele) => {
    kcal += macrosCalories[ele] * macro[ele];
  });
  return Math.round(kcal);
};
