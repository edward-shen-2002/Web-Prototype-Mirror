import 'jest'
import { request } from '../../config/HTTP'
import TemplateType from '../../../entities/TemplateType'

describe('Template type lifecycle', () => {
  let templateTypeCreated: TemplateType

  it('Status creation', (done) => {
    const mockTemplateType = {
      name: 'UHN',
      description: '',

      programIds: [],

      isApprovable: true,
      isReviewable: true,
      isSubmittable: true,
      isInputtable: true,
      isViewable: true,
      isReportable: true
    } as TemplateType

    request
      .post('/root/templateTypes')
      .send({ templateType: mockTemplateType })
      .then((res) => {
        templateTypeCreated = res.body.templateType

        expect(res.status).toBe(200)

        expect(templateTypeCreated.name).toBe(mockTemplateType.name)
        expect(templateTypeCreated.description).toBe(
          mockTemplateType.description
        )
        expect(templateTypeCreated.programIds).toMatchObject(
          mockTemplateType.programIds
        )
        expect(templateTypeCreated.isApprovable).toBe(
          mockTemplateType.isApprovable
        )
        expect(templateTypeCreated.isReviewable).toBe(
          mockTemplateType.isReviewable
        )
        expect(templateTypeCreated.isSubmittable).toBe(
          mockTemplateType.isSubmittable
        )
        expect(templateTypeCreated.isInputtable).toBe(
          mockTemplateType.isInputtable
        )
        expect(templateTypeCreated.isViewable).toBe(mockTemplateType.isViewable)
        expect(templateTypeCreated.isReportable).toBe(
          mockTemplateType.isReportable
        )

        done()
      })
  })
})
