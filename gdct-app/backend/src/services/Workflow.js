import Container, { Service, Inject } from 'typedi'
import WorkflowRepository from '../repositories/Workflow'

// @Service()
export default class WorkflowService {
  constructor() {
    this.workflowRepository = Container.get(WorkflowRepository)
  }

  async createWorkflow(workflowData) {
    const { workflow, workflowProcesses } = workflowData

    return this.workflowRepository.create(workflow)
  }

  async deleteWorkflow(id) {
    return this.workflowRepository.delete(id)
  }

  async updateWorkflow(id, workflow) {
    return this.workflowRepository.update(id, workflow)
  }

  async findWorkflow(workflow) {
    return this.workflowRepository.find(workflow)
  }
}
