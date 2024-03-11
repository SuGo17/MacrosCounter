const macrosCalories = { protein: 4, carbohydrates: 4, fat: 9, fiber: 2 };

export const calcKcal = (macro, qty) => {
  let kcal = 0;
  Object.keys(macrosCalories).forEach((ele) => {
    kcal +=
      (macrosCalories[ele] * (macro["macro"][ele] * qty)) /
      macro["macro"]["qty"];
  });
  return Math.round(kcal);
};
