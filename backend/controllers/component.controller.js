const { validationResult } = require("express-validator");
const componentService = require("../services/component.service");
const userModel = require("../models/user.model");
const componentModel = require("../models/component.model");

//? Component get logic

module.exports.getComponent = async (req, res) => {
  const user = req.user.id;
  console.log(user);

  const components = await componentModel
    .find({ userId: user })
    .sort({ createdAt: -1 });

  res.status(200).json(components);
};

//? Component sava logic
module.exports.saveComponent = async (req, res) => {
  try {
    const errors = validationResult(req);
    const user = req.user.id;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { prompt, code, title } = req.body;

    const component = await componentService.addComponentService({
      prompt,
      code,
      title,
      userId: user,
    });
    await userModel.findOneAndUpdate(
      { _id: user },
      { $push: { components: component._id } },
      { new: true }
    );

    res.status(201).json(component);
  } catch (error) {
    console.log("Add component Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

//? Component delete logic
module.exports.deleteComponent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const componentId = req.params.id;
    const user = req.user.id;
    
    const deletedComponent = await componentService.deleteComponent({
      _id: componentId,
      userId: user,
    });
    if (!deletedComponent)
      return res.status(400).json({ message: "Component doesn't exist" });

    res.json({ ok: true, deletedComponent });
  } catch (error) {
    console.log("delete component error:", error.message);
    res.status(400).json({ message: error.message });
  }
};
