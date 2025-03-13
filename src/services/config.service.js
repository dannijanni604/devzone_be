import OfficeConfig from "../models/config.model.js";

export const GetOfficeConfigService = async () => {
  const config = await OfficeConfig.findOne();
  return config;
};

export const UpdateOfficeConfigService = async (updatedData) => {
  const config = await OfficeConfig.findOneAndUpdate({}, updatedData, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  return config;
};
