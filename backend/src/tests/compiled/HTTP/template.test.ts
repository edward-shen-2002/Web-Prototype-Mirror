import 'jest'
import { IStatus } from '../../../models/Status/interface'
import { ITemplateType } from '../../../models/TemplateType/interface'
// import app from '../../../app'
import server from '../../../server'

export const request = require('supertest')(server)

describe('Template lifecycle', () => {
  let status: IStatus
  let templateType: ITemplateType

  // Create status and template type
  beforeAll(async (done) => (
    request
      .post('/root/statuses')
      .send(
        {
          name: 'Draft',
          description: 'Represents an item which is not finalized or not ready for production',
          isActive: true
        } as IStatus
      )
      
      // .then(() => done())
      // .end((error, res: Response) => {
      
      //   expect(res.statusCode).toEqual(200)
      // })
  ))

  afterAll(() => {
    return server.close()
  })

  it('Template creation', (done) => {
    done()
  })

  // it('Template deletion', () => {

  // })

  // it('Template modification', () => {

  // })

  // it('Template fetching', () => {

  // })
})