const getMeal = (req, res) => {
  const id = req.params.id;
  const date = req.params.date;
  res.json({ msg: "This is get meal route", id, date });
};

const addMeal = (req, res) => {
  res.json({ msg: "This is add meal route" });
};

const updateMeal = (req, res) => {
  res.json({ msg: "This is update meal route" });
};
const deleteMeal = (req, res) => {
  res.json({ msg: "This is delete meal route" });
};

module.exports = { getMeal, addMeal, updateMeal, deleteMeal };
