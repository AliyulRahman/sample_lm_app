// models/services.js

// LocalStorage Keys
const SERVICES_KEY = "literaire_services";
const SLIDER_KEY = "literaire_slider_images";

// Helpers to sync with localStorage
const loadFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading from localStorage", err);
    return [];
  }
};

const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

// Initialize data from localStorage
let services = loadFromStorage(SERVICES_KEY);
let sliderImages = loadFromStorage(SLIDER_KEY);

// ===== SERVICES CRUD =====

export const getServices = () => services;

export const addService = ({ title, description, image }) => {
  const newService = {
    id: Date.now().toString(),
    title,
    description,
    image,
  };
  services.push(newService);
  saveToStorage(SERVICES_KEY, services);
};

export const updateService = (id, updatedData) => {
  const index = services.findIndex((service) => service.id === id);
  if (index !== -1) {
    services[index] = { ...services[index], ...updatedData };
    saveToStorage(SERVICES_KEY, services);
  }
};

export const deleteService = (id) => {
  services = services.filter((service) => service.id !== id);
  saveToStorage(SERVICES_KEY, services);
};

// ===== SLIDER IMAGE CRUD =====

export const getServiceImages = () => sliderImages;

export const addServiceImage = (image) => {
  const newImage = {
    id: Date.now().toString(),
    image,
  };
  sliderImages.push(newImage);
  saveToStorage(SLIDER_KEY, sliderImages);
};

export const updateServiceImage = (id, updatedImage) => {
  const index = sliderImages.findIndex((img) => img.id === id);
  if (index !== -1) {
    sliderImages[index].image = updatedImage;
    saveToStorage(SLIDER_KEY, sliderImages);
  }
};

export const deleteServiceImage = (id) => {
  sliderImages = sliderImages.filter((img) => img.id !== id);
  saveToStorage(SLIDER_KEY, sliderImages);
};
