const getParam = (req) => {
  console.log(req.params);
  return req.params;
};

const getMacros = (req, res) => {
  res.json({ msg: "This is get macros route", ...getParam(req) });
};

const addMacros = (req, res) => {
  res.json({ msg: "This is add macros route" });
};

const updateMacros = (req, res) => {
  res.json({ msg: "This is update macros route", ...getParam(req) });
};

const deleteMacros = (req, res) => {
  res.json({ msg: "This is update macros route", ...getParam(req) });
};
module.exports = { getMacros, addMacros, updateMacros, deleteMacros };
