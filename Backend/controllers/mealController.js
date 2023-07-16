const getParam = (req) => {
  return req.params;
};

const getMeal = (req, res) => {
  res.json({ msg: "This is get meal route", ...getParam(req) });
};

const addMeal = (req, res) => {
  res.json({ msg: "This is add meal route" });
};

const updateMeal = (req, res) => {
  res.json({ msg: "This is update meal route", ...getParam(req) });
};
const deleteMeal = (req, res) => {
  res.json({ msg: "This is delete meal route", ...getParam(req) });
};

module.exports = { getMeal, addMeal, updateMeal, deleteMeal };
