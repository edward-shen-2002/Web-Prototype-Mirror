import 'jest'
import { request } from '../../config/HTTP'
import { IStatus } from '../../../models/Status/interface'
import app from '../../../app'

describe('Status liffecycle', () => {
  it('Status creation', (done) => {
    request
      .post('/root/statuses')
      .send(
        {
          name: 'Draft',
          description: 'Represents an item which is not finalized or not ready for production',
          isActive: true
        } as IStatus
      )
      .then(
        (response) => {
          expect(response.status).toBe(200)
          done()
        }
      )
  })

  afterAll(() => {
  })
})