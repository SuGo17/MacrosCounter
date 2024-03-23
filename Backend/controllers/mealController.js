const Meals = require("../models/mealModule");
const Macros = require("../models/macrosModel");

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
      const { carbohydrates, protein, fiber, fat, qty: macro_qty } = macro_id;
      const macro = { carbohydrates, protein, fat, fiber, qty: macro_qty };
      return {
        _id,
        tag,
        qty,
        date,
        created_by,
        macro,
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
    const {
      _id,
      tag: meal_tag,
      qty: meal_qty,
      date: meal_date,
      created_by,
      macro_id: meal_macro_id,
    } = await meal.populate("macro_id");
    const {
      carbohydrates,
      protein,
      fiber,
      fat,
      qty: macro_qty,
      _id: macro_id_num,
    } = meal_macro_id;
    const macro = {
      carbohydrates,
      protein,
      fat,
      fiber,
      qty: macro_qty,
      _id: macro_id_num,
    };
    res.status(200).json({
      _id,
      tag,
      qty,
      date,
      created_by,
      macro,
      name: meal_macro_id.name,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const updateMeal = async (req, res) => {
  const { id } = getParam(req);

  try {
    const meal = await Meals.findByIdAndUpdate(id, { ...req.body }).populate(
      "macro_id"
    );
    const { _id, tag, qty, date, created_by, macro_id } = meal;
    const {
      carbohydrates,
      protein,
      fiber,
      fat,
      qty: macro_qty,
      _id: macro_id_num,
    } = macro_id;
    const macro = {
      carbohydrates,
      protein,
      fat,
      fiber,
      qty: macro_qty,
      id: macro_id_num,
    };
    res.status(200).json({
      _id,
      tag,
      qty,
      date,
      created_by,
      macro,
      name: macro_id.name,
      ...req.body,
    });
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
