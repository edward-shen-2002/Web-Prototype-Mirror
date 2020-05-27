import React from 'react'

import { AppNavbarBrand } from '@coreui/react'

import logo from '@images/brand/ON_POS_LOGO_WHITE.svg'

import SRIBar from '@images/brand/SRI.jpg'

let RegisterHeader = () => (
  <div>
    <img src={SRIBar} />
    <AppNavbarBrand full={{ src: logo, height: 48, alt: 'MOH Logo' }} />
  </div>
)

export default RegisterHeader
