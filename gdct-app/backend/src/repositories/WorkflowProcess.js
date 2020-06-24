import WorkflowProcessEntity from '../entities/WorkflowProcess'
import BaseRepository from './repository'
import WorkflowProcessModel from '../models/WorkflowProcess'

export default class WorkflowProcessRepository extends BaseRepository {
    constructor() {
      super(WorkflowProcessModel)
    }

    async delete(id) {
      return WorkflowProcessModel.findByIdAndDelete(id).then(
        (workflowProcess) => new WorkflowProcessEntity(workflowProcess.toObject())
      )
    }
  
    async create(workflowProcess) {
      return WorkflowProcessModel.create(workflowProcess)
        .then((workflowProcess) => {
          return new WorkflowProcessEntity(workflowProcess.toObject())
        })
    }
  
    async update(id, workflowProcess) {
      return WorkflowProcessModel.findByIdAndUpdate(id, workflowProcess).then(
        (workflowProcess) => new WorkflowProcessEntity(workflowProcess.toObject())
      )
    }
  
    async find(query) {
      const realQuery = {}
  
      for (const key in query) {
        if (query[key]) realQuery[key] = query[key]
      }
  
      return WorkflowProcessModel.find(realQuery).then((workflowProcesss) =>
        workflowProcesss.map((workflowProcess) => new WorkflowProcessEntity(workflowProcess.toObject()))
      )
    }
}
