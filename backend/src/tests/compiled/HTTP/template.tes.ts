import 'jest'
import { request } from '../../config/HTTP'
import mongoose from 'mongoose'
import Status from '../../../entities/Status'
import Template from '../../../entities/Template'
import TemplateType from '../../../entities/TemplateType'
import User from '../../../entities/User'

describe('Template lifecycle', () => {
  let statusCreated: Status
  let templateTypeCreated: TemplateType
  let userCreated: User
  let templateCreated: Template

  // Create status and template type
  beforeAll(async (done) => {
    let mockStatus: Status = {
      name: 'Draft',
      description: 'Represents an item which is not finalized or not ready for production',
      isActive: true
    } 

    let mockTemplateType: TemplateType = {
      name: 'Hospital Budget Request',
      description: '',
      programIds: [],
      isApprovable: true,
      isReviewable: true,
      isSubmittable: true,
      isInputtable: true,
      isViewable: true,
      isReportable: true
    }

    let mockUser: User = {
      username: 'Lemonalf',
      email: 'lemon@hotmail.com',
      title: 'Student',
      firstName: 'Alfred',
      lastName: 'Lemon',
      phoneNumber: '949-932-1929',
      organizations: [],
      isActive: true,
      isEmailVerified: true,
      isApproved: true,
      creationDate: new Date(),
      approvedDate: new Date()
    }

    request
      .post('/root/statuses')
      .send({ status: mockStatus })
      .then((res) => { statusCreated = res.body.status })
      .then(() => request.post('/root/templateTypes'))
      .then((res) => { templateTypeCreated = res.body.templateType })
      .then(() => request.post('/root/users'))
      .send({ user: mockUser })
      .then((res) => { userCreated = res.body.status })
      .then(() => done())
  })

  it('Template creation', (done) => {
    const mockTemplate: Template = {
      name              : 'Sample',
      templateData      : {},
      templateTypeId    : templateTypeCreated._id,
      userCreatorId     : userCreated._id,
      creationDate      : new Date(),
      expirationDate    : new Date(),
      statusId          : statusCreated._id
    }

    request
      .post('/root/templates')
      .send({ template: mockTemplate })
      .then((template: Template) => {
        templateCreated = template
        
        for(let key in mockTemplate) expect(templateCreated[key]).toBe(mockTemplate[key])

        done()
      })
  })

  it('Template deletion', (done) => {
    done()
  })
})
