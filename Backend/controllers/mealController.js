const Meals = require("../models/mealModule");

const getParam = (req) => {
  return req.params;
};

const getMeal = async (req, res) => {
  const { date } = getParam(req);

  try {
    const meals = await Meals.find({
      date: { $eq: date },
      created_by: req.user._id,
    }).populate("macro_id");
    const updatedMeals = meals.map((ele) => {
      const { _id, tag, qty, date, created_by, macro_id } = ele;
      const macros = {};
      // prettier-ignore
      macros.carbohydrates = ((macro_id.carbohydrates * qty) / macro_id.qty).toFixed(1);
      macros.fat = ((macro_id.fat * qty) / macro_id.qty).toFixed(1);
      macros.fiber = ((macro_id.fiber * qty) / macro_id.qty).toFixed(1);
      macros.protein = ((macro_id.protein * qty) / macro_id.qty).toFixed(1);
      return {
        _id,
        tag,
        qty,
        date,
        created_by,
        ...macros,
        macro_id: macro_id["_id"],
        name: macro_id.name,
      };
    });
    res.status(200).json({ date, meals: updatedMeals });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const addMeal = async (req, res) => {
  const { tag, macro_id, qty, date } = req.body;

  if (!tag || !macro_id || !qty || !date)
    return res
      .status(401)
      .json({ error: "All feilds must be filled before submitting." });

  try {
    const meal = await Meals.create({
      tag,
      macro_id,
      qty,
      created_by: req.user._id,
      date,
    });
    res.status(200).json(meal);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const updateMeal = async (req, res) => {
  const { id } = getParam(req);

  try {
    const meal = await Meals.findByIdAndUpdate(id, { ...req.body });
    res.status(200).json(meal);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
const deleteMeal = async (req, res) => {
  const { id } = getParam(req);

  try {
    const meal = await Meals.findByIdAndDelete(id);
    return res.status(200).json(meal);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = { getMeal, addMeal, updateMeal, deleteMeal };
