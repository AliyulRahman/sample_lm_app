// services.js

let services = [
    // Sample service data
    {
      id: 1,
      title: "Web Development",
      description: "Building modern web applications.",
      image: "https://via.placeholder.com/150",
    },
    // Add more sample services as needed
  ];
  
  let serviceImages = [
    // Sample image data
    "https://via.placeholder.com/200",
    "https://via.placeholder.com/200/ff7f7f",
  ];
  
  // Get all services
  export function getServices() {
    return services;
  }
  
  // Get all service images for the slider
  export function getServiceImages() {
    return serviceImages;
  }
  
  // Add a new service
  export function addService(service) {
    const newService = { ...service, id: services.length + 1 };
    services.push(newService);
  }
  
  // Update an existing service
  export function updateService(id, updatedService) {
    const serviceIndex = services.findIndex((service) => service.id === id);
    if (serviceIndex !== -1) {
      services[serviceIndex] = { ...services[serviceIndex], ...updatedService };
    }
  }
  
  // Delete a service
  export function deleteService(id) {
    services = services.filter((service) => service.id !== id);
  }
  
  // Add a new service image to the image slider
  export function addServiceImage(image) {
    serviceImages.push(image);
  }
  
  // Delete a service image from the slider
  export function deleteServiceImage(index) {
    serviceImages.splice(index, 1);
  }
  
  // Update a service image in the image slider
  export function updateServiceImage(index, newImage) {
    if (index >= 0 && index < serviceImages.length) {
      serviceImages[index] = newImage; // Update the image at the given index
    }
  }
  