import React from 'react'

import { Switch, Route } from 'react-router-dom'

import NotFound from '@tools/components/NotFound'
import COATrees from './COATrees'
import COATree from './COATree'
import COAGroups from './COAGroups'
import COAs from './COAs'

const TemplateRouter = () => (
  <Switch>
    <Route exact path="/COA_manager/COA_groups" component={COAGroups} />
    <Route exact path="/COA_manager/COAs" component={COAs} />
    <Route exact path="/COA_manager/COA_trees" component={COATrees} />
    <Route exact path="/COA_manager/COA_trees/:_id" component={COATree} />

    <Route component={NotFound} />
  </Switch>
)

export default TemplateRouter
