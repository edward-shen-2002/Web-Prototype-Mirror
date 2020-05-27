import { deleteAxiosToken, setAxiosToken } from '@tools/rest'
import { deleteToken, saveToken } from '@tools/storage'

import { setOnline, setOffline } from '@actions/app/isOnline'
import { updateAccount, resetAccount } from '@actions/domain/account'
import {
  showAppNavigation,
  hideAppNavigation,
} from '@actions/ui/isAppNavigationOpen'

export const loadUserState = (dispatch, { user, token }) => {
  if (token) {
    saveToken(token)
    setAxiosToken(token)
  }

  dispatch(setOnline())
  dispatch(updateAccount(user))
  dispatch(showAppNavigation())
}

export const resetUserState = (dispatch) => {
  deleteAxiosToken()
  deleteToken()

  dispatch(setOffline())

  dispatch(resetAccount())

  dispatch(hideAppNavigation())
}
