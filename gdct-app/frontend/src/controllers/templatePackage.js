import axios from 'axios';

const templatePackageController = (() => {
  const templatePackageAxios = axios.create({
    baseURL: 'http://localhost:3000/template_manager/templatePackages',
  });
  return {
    fetchPopulated: async _id =>
      templatePackageAxios.get(`/populated/${_id}`).then(res => res.data.templatePackage),
    fetchTemplatePackage: async _id =>
      templatePackageAxios.get(`/${_id}`).then(res => res.data.templatePackage),
    fetch: async _ => templatePackageAxios.get('').then(res => res.data.templatePackages),
    create: async templatePackage =>
      templatePackageAxios.post('', { templatePackage }).then(res => res.data.templatePackage),
    delete: async _id => templatePackageAxios.delete(`/${_id}`),
    update: async templatePackage =>
      templatePackageAxios.put(`/${templatePackage._id}`, { templatePackage }),
    updatePopulated: async templatePackage =>
      templatePackageAxios
        .put(`/populated/${templatePackage._id}`, { templatePackage })
        .then(res => {
          console.log('d', res.data.templatePackage);
          return [res.data.templatePackage];
        }),
  };
})();

export default templatePackageController;
