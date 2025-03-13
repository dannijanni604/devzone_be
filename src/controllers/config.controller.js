import * as OfficeConfig from "../services/config.service.js";
export const GetOfficeConfig = async (req, res) => {
  try {
    checkUserAuthorization(req.user);

    const config = await OfficeConfig.GetOfficeConfigService();
    if (!config) {
      return res
        .status(404)
        .json({ success: false, message: "Office configuration not found" });
    }

    res.status(200).json({ config: config });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const UpdateOfficeConfig = async (req, res) => {
  try {
    checkUserAuthorization(req.user);

    const updatedData = req.body;
    if (!updatedData) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided for update" });
    }

    const updatedConfig = await OfficeConfig.UpdateOfficeConfigService(
      updatedData
    );
    res.status(200).json({
      message: "Office configuration updated",
      config: updatedConfig,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
