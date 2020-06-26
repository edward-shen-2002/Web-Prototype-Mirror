import mongoose from 'mongoose'
import Container from 'typedi'
import WorkflowRepository from '../repositories/Workflow'
import WorkflowProcessRepository from '../repositories/WorkflowProcess'

const objectId = mongoose.Types.ObjectId

const markVisitableNodes = (startingNode, linkMapSet, visited) => {
  visited.add(startingNode)
  const adjacentNodes = linkMapSet[startingNode]

  if(adjacentNodes) {
    adjacentNodes.forEach(
      (adjacentNode) => {
        if(!visited.has(adjacentNode)) markVisitableNodes(adjacentNode, linkMapSet, visited)
      }
    )
  }
}

// TODO : Validate links - make sure there is only one starting node and connected graph
// @Service()
export default class WorkflowService {
  constructor() {
    this.workflowRepository = Container.get(WorkflowRepository)
    this.workflowProcessesRepository = Container.get(WorkflowProcessRepository)
  }

  async createWorkflow(workflowData) {
    let { workflow, workflowProcessesData, statusData } = workflowData
    const workflowProcessesMap = {}

    if(statusData.length < 2) throw 'There must be at least two node'
    if(!workflowProcessesData.length) throw 'There must be at least one link'

    workflow._id = objectId()

    // Create a workflow process for each node
    for(let item of statusData) {
      const { id, statusId } = item

      workflowProcessesMap[id] = {
        _id: objectId(),
        workflowId: workflow._id,
        statusId,
        to: []
      }
    }

    // Link the workflow processes
    for(let item of workflowProcessesData) {
      const { id, to, position } = item
      workflowProcessesMap[id].to = to.map(
        ({ id }) => workflowProcessesMap[id]._id 
      )

      workflowProcessesMap[id].position = position
    }
    
    const workflowProcesses = Object.values(workflowProcessesMap)

    return this.workflowRepository.create(workflow)
      .then(() => this.workflowProcessesRepository.createMany(workflowProcesses))
  }

  async findWorkflowById(id) {
    return this.workflowRepository.findById(id)
      .then(async (workflow) => {

        return this.workflowProcessesRepository.find({ workflowId: id })
          .then((workflowProcesses) => ({ workflow, workflowProcesses }))
      })
  }

  async deleteWorkflow(workflowId) {
    return this.workflowRepository.delete(workflowId)
      .then(() => this.workflowProcessesRepository.deleteMany(workflowId))
  }

  async updateWorkflow(id, workflow) {
    return this.workflowRepository.update(id, workflow)
  }

  async findWorkflow(workflow) {
    return this.workflowRepository.find(workflow)
  }
}
