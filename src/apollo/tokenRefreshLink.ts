import { TokenRefreshLink } from 'apollo-link-token-refresh';
import {getAuthData, USER_COOKIE} from '../utils/session'
import {isJwtExpired} from 'jwt-check-expiration'
import { refreshToken } from './renew';

export const tokenRefreshLink=   new TokenRefreshLink({
    isTokenValidOrUndefined: async () => {

      if (typeof window !=='undefined') {
        try {

          if (typeof window ==='undefined'  && !(JSON.parse(localStorage.getItem('yellow-cartee')??"{}")?.token)) {
            
return true            
          }else{


            return !isJwtExpired((JSON.parse(localStorage.getItem('yellow-cartee')??"{}")?.token))
          }

        } catch (error) {
            return false            
        }
      }else{
        return false
      }
      

    },
    // @ts-ignore
    fetchAccessToken: async () => {
      try {
console.log("fetching token");
const token =await refreshToken() 
console.log(token);

// if (token==='expired' || token ==='unathorized') {
//   return ''

// }else{
  return token

// }


      } catch (error) {

        console.log(error);
        return ''
        
      }
    },
    handleFetch: (accessToken , operation) => {
      try {
        
        if (accessToken) {
        const auth =  JSON.parse(localStorage.getItem(USER_COOKIE)??"{}")

          localStorage.setItem(USER_COOKIE , JSON.stringify({
            ...auth,
           token: accessToken}))

          
                  }else{
                    localStorage.setItem(USER_COOKIE , JSON.stringify({}))

                  }
          
      } catch (error) {
        console.log(error);
        localStorage.setItem(USER_COOKIE , JSON.stringify({}))

      }
   
 
    },
    handleResponse: (operation, accessTokenField) => (responsce:string) => {
      try {
        return {
          access_token: responsce
       }
      } catch (error) {
        console.log(error);
        return {
          access_token: ''
       }
      }
  
    },
    handleError: err => {
      try {
               // full control over handling token fetch Error
       console.warn('Your refresh token is invalid. Try to relogin');
       console.error(err);
       
       // When the browser is offline and an error occurs we don’t want the user to be logged out of course.
       // We also don’t want to delete a JWT token from the `localStorage` in this case of course.
       if (
         !navigator.onLine ||
         (err instanceof TypeError &&
           err.message === "Network request failed")
       ) {
         console.log("Offline -> do nothing 🍵")
       } else {
         console.log("Online -> log out 👋")

         // your custom action here
      }       
      } catch (error) {
        console.log(error);
        
      }

    }
  })
