import React from 'react'

const AuthPageContent = ({ children }) => (
  <div>
    {children}
  </div>
)

export const AuthPage = ({ children }) => (
  <div>
    <AuthPageContent>
      {children}
    </AuthPageContent>
  </div>
)
