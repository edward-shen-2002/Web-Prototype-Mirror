import 'jest'
import { request } from '../../config/HTTP'
import { IStatus } from '../../../models/Status/interface'
import app from '../../../app'
import mongoose from 'mongoose'

describe('Status liffecycle', () => {
  it('Status creation', (done) => {
    const status = {
      name: 'Draft',
      description:
        'Represents an item which is not finalized or not ready for production',
      isActive: true,
    } as IStatus

    request
      .post('/root/statuses')
      .send({ status })
      .then((res) => {
        const statusCreated: IStatus = res.body.status
        expect(res.status).toBe(200)

        expect(statusCreated.name).toBe(status.name)
        expect(statusCreated.description).toBe(status.description)
        expect(statusCreated.isActive).toBe(status.isActive)

        done()
      })
  })

  it('Status creation', (done) => {
    done()
  })

  afterAll(() => {})
})
