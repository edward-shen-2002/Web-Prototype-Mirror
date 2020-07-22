import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useEffect } from 'react'
import { Formik, Form } from 'formik'
import { selectTemplatePackagesStore } from '../../store/TemplatePackagesStore/selectors'
import { selectFactoryValueById } from '../../store/common/REST/selectors'
import { useCallback } from 'react'
import {
  Button,
  TextField,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import {
  getTemplatePackagePopulatedRequest,
  updateTemplatePackageRequest,
} from '../../store/thunks/templatePackage'
import {
  StatusIdButton,
  SubmissionPeriodIdButton,
} from '../../components/buttons'
import { useMemo } from 'react'
import TemplateDialog from '../../components/dialogs/TemplateDialog'
import { DialogsStoreActions } from '../../store/DialogsStore/store'
import uniqid from 'uniqid'
import { TemplatePackagesStoreActions } from '../../store/TemplatePackagesStore/store'

const init = {
  name: '',
  submissionPeriodId: {},
  templateIds: [],
  statusId: {},
}

const CustomButton = ({ text, handleClick }) => (
  <Button
    onClick={handleClick}
    size="small"
    className="p-0"
    variant="contained"
    color="primary"
  >
    {text}
  </Button>
)

const Header = ({ handleSubmit }) => (
  <div className="d-flex justify-content-between p-2 mb-3">
    <Typography variant="h5">Template Packages</Typography>
    <Button onClick={handleSubmit} variant="contained" color="primary">
      Create
    </Button>
  </div>
)

const CustomField = ({ label, children, addButton = false, handleClick }) => (
  <div className="mb-2 mt-3">
    <div className="d-flex justify-content-between">
      <span className={`align-baseline ${addButton ? 'mr-5' : ''}`}>
        {label}
      </span>
      {addButton && <CustomButton text="Add" handleClick={handleClick} />}
    </div>
    {children}
  </div>
)

const FirstSection = ({
  values,
  handleChangeStatus,
  handleChangeSubmissionPeriod,
}) => (
  <div>
    <CustomField label="Status">
      <StatusIdButton
        value={values.statusId.name}
        onChange={handleChangeStatus}
        isPopulated
      />
    </CustomField>
    <CustomField label="Submission Period">
      <SubmissionPeriodIdButton
        value={values.submissionPeriodId.name}
        onChange={handleChangeSubmissionPeriod}
        isPopulated
      />
    </CustomField>
  </div>
)

const SecondSection = ({ values, handleRemoveTemplate }) => {
  const dispatch = useDispatch()

  const handleOpenTemplateDialog = useCallback(() => {
    dispatch(DialogsStoreActions.OPEN_TEMPLATE_DIALOG())
  }, [dispatch])

  return (
    <div>
      <CustomField
        label="Templates"
        handleClick={handleOpenTemplateDialog}
        addButton
      >
        <List>
          {values.templateIds.map((template) => (
            <ListItem key={uniqid()}>
              <ListItemText className="mr-5" primary={template.name} />
              <ListItemSecondaryAction>
                <CustomButton
                  text="Delete"
                  handleClick={() => handleRemoveTemplate(template)}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CustomField>
    </div>
  )
}

const ThirdSection = () => <div className="mb-2 mt-3" />

const Sections = ({
  values,
  handleRemoveTemplate,
  handleChangeStatus,
  handleChangeSubmissionPeriod,
}) => (
  <div className="d-flex justify-content-between">
    <FirstSection
      values={values}
      handleChangeStatus={handleChangeStatus}
      handleChangeSubmissionPeriod={handleChangeSubmissionPeriod}
    />
    <SecondSection
      values={values}
      handleRemoveTemplate={handleRemoveTemplate}
    />
    <ThirdSection />
  </div>
)

const Content = ({ setFieldValue, handleChange, values }) => {
  const handleChangeField = useCallback(
    (field) => (data) => {
      setFieldValue(field, data)
    },
    [setFieldValue, values]
  )

  const handleChangeSubmissionPeriod = handleChangeField('submissionPeriodId')
  const handleChangeStatus = handleChangeField('statusId')
  const handleChangeTemplates = handleChangeField('templateIds')

  const selectedTemplates = useMemo(() => {
    const selected = {}

    values.templateIds.forEach((template) => (selected[template._id] = true))

    return selected
  }, [values])

  const handleAddTemplate = useCallback(
    (template) => {
      let newTemplates = values.templateIds.filter(
        ({ _id }) => _id !== template._id
      )

      if (newTemplates.length === values.templateIds.length)
        newTemplates = [...values.templateIds, template]

      handleChangeTemplates(newTemplates)
    },
    [values, handleChangeTemplates]
  )

  const handleRemoveTemplate = useCallback(
    (template) => {
      handleChangeTemplates(
        values.templateIds.filter(({ _id }) => _id !== template._id)
      )
    },
    [values, handleChangeTemplates]
  )

  return (
    <Paper className="pl-4 pr-4 pb-5 pt-4">
      <TextField
        className="mb-3"
        name="name"
        value={values.name}
        onChange={handleChange}
        variant="outlined"
        label="Name"
        size="small"
      />
      <Sections
        values={values}
        handleRemoveTemplate={handleRemoveTemplate}
        handleChangeStatus={handleChangeStatus}
        handleChangeSubmissionPeriod={handleChangeSubmissionPeriod}
      />
      <TemplateDialog
        selectedTemplates={selectedTemplates}
        handleChange={handleAddTemplate}
        shouldClose={false}
      />
    </Paper>
  )
}

const TemplatePackage = ({
  match: {
    params: { _id },
  },
}) => {
  const dispatch = useDispatch()

  const { templatePackage } = useSelector((state) => {
    const templatePackage = selectFactoryValueById(selectTemplatePackagesStore)(
      _id
    )(state)

    return {
      templatePackage: templatePackage ? templatePackage : init,
    }
  }, shallowEqual)

  useEffect(() => {
    if (_id) {
      dispatch(getTemplatePackagePopulatedRequest(_id, true))
    }
    return () => {
      dispatch(TemplatePackagesStoreActions.RESET())
    }
  }, [dispatch, _id])

  const handleSubmit = useCallback(
    (t) => {
      const formattedTemplatePackage = {
        _id,
        name: t.name,
        statusId: t.statusId._id,
        submissionPeriodId: t.submissionPeriodId._id,
        templateIds: t.templateIds.map(({ _id }) => _id),
      }

      dispatch(
        updateTemplatePackageRequest(formattedTemplatePackage, null, null, true)
      )
    },
    [dispatch, _id]
  )

  return (
    <Formik
      enableReinitialize
      initialValues={templatePackage}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          <Header {...props} />
          <Content {...props} />
        </Form>
      )}
    </Formik>
  )
}

export default TemplatePackage
