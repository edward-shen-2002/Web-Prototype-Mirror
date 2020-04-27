import 'jest'
import { IStatus } from '../../../models/Status/interface'
import { ITemplateType } from '../../../models/TemplateType/interface'
import { request } from '../../config/HTTP'
import mongoose from 'mongoose'
import { ITemplate } from '../../../models/Template/interface'

describe('Template lifecycle', () => {
  let status: IStatus
  let templateType: ITemplateType

  // Create status and template type
  // beforeAll(async (done) => (
  //   request
  //     .post('/root/statuses')
  //     .send(
  //       {
  //         name: 'Draft',
  //         description: 'Represents an item which is not finalized or not ready for production',
  //         isActive: true
  //       } as IStatus
  //     )
  //     .then(
  //       (res) => {
  //         console.log(res.body)
  //         done()
  //       }
  //     )

  //     // .then(() => done())
  //     // .end((error, res: Response) => {

  //     //   expect(res.statusCode).toEqual(200)
  //     // })
  // ))

  afterAll((done) => {
    mongoose.disconnect()
  })

  // it('Template creation', (done) => {
  //   const template: ITemplate = {
  //     name              : 'Sample',
  //     templateData      : {},
  //     templateTypeId    : 2,
  //     userCreatorId     : 2,
  //     creationDate      : new Date(),
  //     expirationDate    : new Date(),
  //     statusId          : 2
  //   }

  //   request
  //     .post('/root/templates')
  //     .send(
  //       {

  //       }
  //     )
  //   done()
  // })

  it('Template deletion', (done) => {
    done()
  })

  // it('Template modification', () => {

  // })

  // it('Template fetching', () => {

  // })
})
