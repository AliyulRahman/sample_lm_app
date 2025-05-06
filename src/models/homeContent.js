const STORAGE_KEY = "home_tab_data";

export const getHomeContent = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveHomeContent = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
