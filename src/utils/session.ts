import { IinitialStateAuth } from '../store/slices/auth/authSlice';

export const USER_COOKIE = 'yellow-cartee';

export function getAuthData() {
    if (typeof window === 'undefined') return {
      token: null,

    };
  const AuthData: string | undefined | null =typeof window !=='undefined' ?localStorage.getItem('yellow-cartee') &&JSON.parse(localStorage.getItem(USER_COOKIE)??"{}"):{}

  const persustedData = AuthData;
  return persustedData;

  if (typeof AuthData === 'string') {
    const persustedData = AuthData;
    return persustedData;
  } else
    return JSON.stringify({token: null})
}
interface localstorageAuth {}
export function setAuthData(auth: IinitialStateAuth) {
  
  const strState = JSON.stringify(auth);
  localStorage.setItem(USER_COOKIE, strState);
}
