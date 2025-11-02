import api from "./api";

export const getUserSetting = async () => {
    const res = await api.get("/settings");
    return res.data;
};

export const updateUserSetting = async (data) => {
    const res = await api.put("/settings", data);
    return res.data;
};
