import { Service } from 'typedi';

import { Router } from 'express';
import TemplateType from '../../entities/TemplateType';
import TemplateTypeService from '../../services/TemplateType';

const TemplateTypeController = Service([TemplateTypeService], service => {
  const router = Router();
  return (() => {
    router.get('/templateTypes', (req, res, next) => {
      // Get query from middleware -- auth handler

      service
        .findTemplateType({})
        .then(templateTypes => res.json({ templateTypes }))
        .catch(next);
    });

    router.post('/templateTypes', (req, res, next) => {
      service
        .createTemplateType(req.body.templateType)
        .then(templateType => res.json({ templateType }))
        .catch(next);
    });

    router.put('/templateTypes/:_id', (req, res, next) => {
      const { _id } = req.params;
      const { templateType } = req.body;

      service
        .updateTemplateType(_id, templateType)
        .then(() => res.end())
        .catch(next);
    });

    router.delete('/templateTypes/:_id', (req, res, next) => {
      const { _id } = req.params;

      service
        .deleteTemplateType(_id)
        .then(() => res.end())
        .catch(next);
    });

    router.post('/templateTypes/searchTemplateTypeByProgramIds', (req, res, next) => {
      const { programIds } = req.body;

      service.findTemplateTypeByProgramIds(programIds).then(templateTypes => {
        res.json({ templateTypes });
      });
    });

    return router;
  })();
});

export default TemplateTypeController;
