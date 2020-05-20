import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

import { 
  getTemplatePackagesRequest, 
  createTemplatePackageRequest, 
  deleteTemplatePackageRequest, 
  updateTemplatePackageRequest 
} from '../../../../store/thunks/templatePackage'

import MaterialTable from 'material-table'
import Paper from '@material-ui/core/Paper';
import LaunchIcon from "@material-ui/icons/Launch";

import Typography from "@material-ui/core/Typography";

import './TemplatePackages.scss'

// Template Package Store
// Deals with the local input 

const TemplatePackagesTable = ({ history }) => {
  const dispatch = useDispatch()

  const {
    templatePackages
  } = useSelector(
    (
      {
        TemplatePackagesStore: {
          isCallInProgress
        }
      }
    ) => (
      {
        templatePackages: Values[0]
      }
    ),
    shallowEqual
  )


  useEffect(
    () => {
      dispatch(getTemplatePackagesRequest())
    },
    [ dispatch ]
  )

  return (
    <div>

    </div>
  )
}

const TemplatePackage = (props) => (
  <div className="templatePackages">
    <TemplatePackageHeader/>
    <TemplatePackagesTable {...props}/>
  </div>
)

export default TemplatePackage