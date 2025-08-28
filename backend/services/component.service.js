const componentModel = require("../models/component.model");
module.exports.addComponentService = async ({
  prompt,
  code,
  userId,
  title,
}) => {
  try {
    if (!prompt || !code || !userId || !title) {
      throw new Error("All fields are required");
    }

    const component = await componentModel.create({
      prompt,
      code,
      userId,
      title,
    });

    return component;
  } catch (error) {
    console.log("components service error:", error.message);
    throw new Error(error.message);
  }
};

module.exports.deleteComponent = async ({ _id, userId }) => {
  try {
    const deletedComponent = await componentModel.findOneAndDelete({
      _id,
      userId,
    });

    if (deletedComponent) {
      await activityModel.create({
        action: `Deleted component: ${deletedComponent.title}`,
        userId,
        prompt: deletedComponent.prompt,
      });
    }

    return deletedComponent;
  } catch (error) {
    console.log("error from delete component", error.message);
    throw new Error(error.message);
  }
};
