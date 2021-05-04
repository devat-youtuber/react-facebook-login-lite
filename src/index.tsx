import React, { useState, useEffect } from 'react'
// @ts-ignore
import facebook from './public/facebook.png'
import './public/styles.css'


export const FacebookLogin = ({
    language, 
    appId, 
    version, 
    scope, 
    fields, 
    height, 
    theme,
    imgSrc,
    btnText,
    onSuccess, 
    onFailure, 
    isSignedIn
}: FacebookLoginProps) => {

    const [fbWindow, setFBWindow] = useState<any>()
    
    useEffect(() => {
        const script = document.createElement('script')

        script.src = `https://connect.facebook.net/${language}/sdk.js`
        script.async = true
        script.defer = true
        script.crossOrigin="anonymous"

        script.addEventListener('load', () => {
            const { FB }: any = window;
            FB.init({
                appId,
                cookie: true,
                xfbml: true,
                version
            })

            setFBWindow(window)
           
        })

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    },[language, appId, version])


    

    const statusChangeCallback = (response: FacebookLoginAuthResponse) => {
        if (response.status === 'connected') {
            fetchDataFacebook(response);
        } else if (response.status === 'not_authorized') {
            onFailure('Import error, Authorize app to import data, error')
        } else {
            onFailure('Import error, Error occured while importing data, error')
        }
    }


    const facebookLogin = () => {
        fbWindow.FB.login((response: FacebookLoginAuthResponse) => {
            statusChangeCallback(response)
        }, {scope});
    }

    const fetchDataFacebook = (response: FacebookLoginAuthResponse) => {

        fbWindow.FB.api('/me', { fields: fields.split(', ') }, (user: FacebookLoginUser) => {
            onSuccess({user, ...response});
        });
    }

    useEffect(() => {
        if(!isSignedIn || !fbWindow) return;

        fbWindow.FB.getLoginStatus((response: FacebookLoginAuthResponse) => {
            return statusChangeCallback(response)
        });
        // eslint-disable-next-line
    },[isSignedIn, fbWindow])


    return (
        <div id="fb-login" style={{height}} onClick={facebookLogin} 
        className={theme === 'dark' ? 'dark' : 'light'}>
            <img src={imgSrc} title="facebook login" alt="facebook"
            style={{objectFit: 'cover'}} />
            <span>{btnText}</span>
        </div>
    )
}


FacebookLogin.defaultProps = {
    language: 'en_US',
    version: 'v10.0',
    scope: 'public_profile,email',
    fields: "id,email,first_name,last_name,middle_name,name,picture,short_name",
    height: '50px',
    theme: 'light',
    imgSrc: facebook,
    btnText: 'Sign in with Facebook',
    onSuccess: (response: FacebookLoginAuthResponse) => {
        console.log(response)
    },
    onFailure: (error: any) => {
        console.log(error)
    },
    isSignedIn: false
}


export default FacebookLogin





export interface FacebookLoginProps {
    appId: string
    version: string
    scope: string
    fields: string
    height: string
    theme: string
    imgSrc: string
    btnText: string
    onSuccess: (response: FacebookLoginAuthResponse) => void
    onFailure: (error: any) => void
    isSignedIn: boolean
    language: string
}

export interface FacebookLoginAuthResponse {
    authResponse: {
        accessToken: string
        data_access_expiration_time: number
        expiresIn: number
        graphDomain: string
        signedRequest: string
        userID: string
    }
    status: string
    user?: FacebookLoginUser
    
}


export interface FacebookLoginUser  {
    id: string
    email?: string
    name?: string
    first_name?: string
    last_name?: string
    middle_name?: string
    short_name?: string
    picture?: {
        data: {
            height?: number
            is_silhouette?: boolean
            url?: string
            width?: number
      }
    }
}
