const macrosCalories = { protein: 4, carbohydrates: 4, fat: 9, fiber: 2 };

export const mealCalcKcal = (meal, qty) => {
  let kcal = 0;
  Object.keys(macrosCalories).forEach((ele) => {
    if (meal && meal["macro"]) {
      kcal +=
        (macrosCalories[ele] * (meal["macro"][ele] * qty)) /
        meal["macro"]["qty"];
    }
  });
  return Math.round(kcal);
};

export const macroCalcKcal = (macro, qty) => {
  let kcal = 0;
  Object.keys(macrosCalories).forEach((ele) => {
    if (macro) {
      kcal += (macrosCalories[ele] * (macro[ele] * qty)) / macro["qty"];
    }
  });
  return Math.round(kcal);
};
