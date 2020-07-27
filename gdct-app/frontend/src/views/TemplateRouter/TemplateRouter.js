import React from 'react';

import { Switch, Route } from 'react-router-dom';

import NotFound from '../../components/NotFound';

import Template from './Template/Template';
import Templates from './Templates/Templates';
import TemplateTypes from './TemplateTypes';
import TemplateType from './TemplateType';
import TemplatePackages from './TemplatePackages';
import { ROUTE_TEMPLATE_PCKGS_PCKGS, ROUTE_TEMPLATE_PCKGS_PCKG } from '../../constants/routes';
import TemplatePackage from './TemplatePackage';

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/template_manager/templates" component={Templates} />
    <Route exact path="/template_manager/templates/:_id" component={Template} />
    <Route exact path="/template_manager/templateTypes" component={TemplateTypes} />
    <Route exact path="/template_manager/templateTypes/:_id" component={TemplateType} />
    <Route exact path={ROUTE_TEMPLATE_PCKGS_PCKGS} component={TemplatePackages} />
    <Route exact path={ROUTE_TEMPLATE_PCKGS_PCKG} component={TemplatePackage} />
    <Route component={NotFound} />
  </Switch>
);

export default TemplateRouter;