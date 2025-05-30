import { useState, useEffect } from "react";
import {
  getServices,
  addService,
  updateService,
  deleteService,
  getServiceImages,
  addServiceImage,
  deleteServiceImage,
  updateServiceImage,
} from "../../models/services";
import "./ServicesTab.css";

export default function ServicesTab() {
  const [activeTab, setActiveTab] = useState("services");

  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  const [serviceImages, setServiceImages] = useState([]);
  const [imageForm, setImageForm] = useState({ image: "", id: null });

  useEffect(() => {
    setServices(getServices());
    setServiceImages(getServiceImages());
  }, []);

  const handleFileToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  // === Services Section ===
  const handleServiceInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleServiceImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileToBase64(file, (base64) =>
        setForm((prev) => ({ ...prev, image: base64 }))
      );
    }
  };

  const handleAddOrUpdateService = () => {
    if (editingServiceId) {
      updateService(editingServiceId, form);
    } else {
      addService(form);
    }
    setServices(getServices());
    setForm({ title: "", description: "", image: "" });
    setEditingServiceId(null);
  };

  const handleEditService = (service) => {
    setForm(service);
    setEditingServiceId(service.id);
  };

  const handleDeleteService = (id) => {
    deleteService(id);
    setServices(getServices());
  };

  // === Image Slider Section ===
  const handleSliderImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileToBase64(file, (base64) =>
        setImageForm((prev) => ({ ...prev, image: base64 }))
      );
    }
  };

  const handleAddOrUpdateSliderImage = () => {
    if (imageForm.id) {
      updateServiceImage(imageForm.id, imageForm.image);
    } else {
      addServiceImage(imageForm.image);
    }
    setServiceImages(getServiceImages());
    setImageForm({ image: "", id: null });
  };

  const handleEditSliderImage = (img) => {
    setImageForm({ image: img.image, id: img.id });
  };

  const handleDeleteSliderImage = (id) => {
    deleteServiceImage(id);
    setServiceImages(getServiceImages());
  };

  return (
    <div className="services-tab">
      <h2>Services Management</h2>

      <div className="tab-buttons">
        <button
          className={activeTab === "services" ? "active" : ""}
          onClick={() => setActiveTab("services")}
        >
          Services
        </button>
        <button
          className={activeTab === "slider" ? "active" : ""}
          onClick={() => setActiveTab("slider")}
        >
          Image Slider
        </button>
      </div>

      {activeTab === "services" && (
        <div className="tab-content">
          <h3>Manage Services</h3>
          <div className="service-form">
            <input
              name="title"
              placeholder="Service Title"
              value={form.title}
              onChange={handleServiceInputChange}
            />
            <textarea
              name="description"
              placeholder="Service Description"
              value={form.description}
              onChange={handleServiceInputChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleServiceImageChange}
            />
            <button onClick={handleAddOrUpdateService}>
              {editingServiceId ? "Update" : "Add"} Service
            </button>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <div key={service.id} className="service-card">
                <img src={service.image} alt={service.title} />
                <h4>{service.title}</h4>
                <p>{service.description}</p>
                <div className="card-actions">
                  <button onClick={() => handleEditService(service)}>Edit</button>
                  <button onClick={() => handleDeleteService(service.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "slider" && (
        <div className="tab-content">
          <h3>Service Image Slider</h3>
          <div className="slider-form">
            <input type="file" accept="image/*" onChange={handleSliderImageChange} />
            <button onClick={handleAddOrUpdateSliderImage}>
              {imageForm.id ? "Update" : "Add"} Image
            </button>
          </div>

          <div className="slider-images">
            {serviceImages.map((img) => (
              <div key={img.id} className="slider-image-card">
                <img src={img.image} alt="Slider" />
                <div className="card-actions">
                  <button onClick={() => handleEditSliderImage(img)}>Edit</button>
                  <button onClick={() => handleDeleteSliderImage(img.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
