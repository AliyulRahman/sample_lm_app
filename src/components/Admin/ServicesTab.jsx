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
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  const [serviceImages, setServiceImages] = useState([]);
  const [imageForm, setImageForm] = useState({ image: "", index: null });

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
    if (imageForm.index !== null) {
      updateServiceImage(imageForm.index, imageForm.image);
    } else {
      addServiceImage(imageForm.image);
    }
    setServiceImages(getServiceImages());
    setImageForm({ image: "", index: null });
  };

  const handleEditSliderImage = (index) => {
    setImageForm({ image: serviceImages[index], index });
  };

  const handleDeleteSliderImage = (index) => {
    deleteServiceImage(index);
    setServiceImages(getServiceImages());
  };

  return (
    <div className="services-tab">
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
        <input type="file" accept="image/*" onChange={handleServiceImageChange} />
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

      <hr />

      <h3>Service Image Slider</h3>
      <div className="slider-form">
        <input type="file" accept="image/*" onChange={handleSliderImageChange} />
        <button onClick={handleAddOrUpdateSliderImage}>
          {imageForm.index !== null ? "Update" : "Add"} Image
        </button>
      </div>

      <div className="slider-images">
        {serviceImages.map((img, idx) => (
          <div key={idx} className="slider-image-card">
            <img src={img} alt={`Slider ${idx + 1}`} />
            <div className="card-actions">
              <button onClick={() => handleEditSliderImage(idx)}>Edit</button>
              <button onClick={() => handleDeleteSliderImage(idx)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
