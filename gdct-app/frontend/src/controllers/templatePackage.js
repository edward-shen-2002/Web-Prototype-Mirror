import axios from 'axios';

const templatePackageController = (() => {
  const templateAxios = axios.create({
<<<<<<< HEAD
    baseURL: `${host}/template_manager/templatePackages`,
=======
    baseURL: 'http://localhost:3000/template_manager/templatePackages',
>>>>>>> 9c3220b0b7cd82e2a65ab21362bd75fd073597ee
  });
  return {
    fetchTemplatePackage: async _id =>
      templateAxios.get(`/${_id}`).then(res => res.data.templatePackage),
    fetch: async query => templateAxios.get('').then(res => res.data.templatePackages),
    create: async templatePackage =>
      templateAxios.post('', { templatePackage }).then(res => res.data.templatePackage),
    delete: async _id => templateAxios.delete(`/${_id}`),
    update: async templatePackage =>
      templateAxios.put(`/${templatePackage._id}`, { templatePackage }),
  };
})();

export default templatePackageController;
