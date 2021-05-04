# React Facebook Login Lite

> React Facebook Login / Log-in Component for React


## Install
```
npm install react-facebook-login-lite
```

## How to use
```js
import FacebookLogin from 'react-facebook-login-lite';
// or
import { FacebookLogin } from 'react-facebook-login-lite';


const onSuccess = (response) => {
  console.log(response);
}

const onFailure = (error) => {
  console.log(error);
}

//or typescript
const onSuccess = (response: FacebookLoginAuthResponse) => {
  console.log(response);
}

const onFailure = (error: any) => {
  console.log(error);
}


ReactDOM.render(
    <FacebookLogin 
      appId="your-facebook-app-id"
      onSuccess={onSuccess}
      onFailure={onFailure}
    />,
    document.getElementById('root')
);
```

## Stay Logged in
`isSignedIn={true}` attribute will call `onSuccess` callback on load to keep the user signed in.
```jsx
    <FacebookLogin 
      appId="your-facebook-app-id"
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
    />
```


## onSuccess callback

 1. In the `onSuccess(response) {...}` callback function, You will get a response includes:
  * `authResponse`
  * `status`
  * `user` 
 2. Send `const { accessToken, userID } = response.authResponse` to your server 
 3. Have your server sending a GET request to `https://graph.facebook.com/v3.0/${userID}/?fields=id,first_name,last_name,middle_name,email,picture&access_token=${accessToken}`


More details can be found in the official Facebook for devolopers:
 * https://developers.facebook.com/docs/facebook-login/web


## Login Props

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|     appId    |  string  |               REQUIRED               | You can create a appId by creating a [facebook app](https://developers.facebook.com/apps/?show_reminder=true) |
|     scope    |  string  |          public_profile,email        |                  |
|   language   |  string  |               en_US                  |                  |
|    version   |  string  |               v10.0                  |                  |
|     fields   |  string  | id,email,first_name,last_name,middle_name,name,picture,short_name |                  |
|     height   |  string  |                50px                  |                  |
|     theme    |  string  |               light                  | There are two values: 'dark' and 'light'  |
|    imgSrc    |  string  |              facebook                |                  |
|    btnText   |  string  |         Sign in with Facebook        |                  |
|   onSuccess  | function |               REQUIRED               |                  |
|   onFailure  | function |               REQUIRED               |                  |
| isSignedIn   | boolean  |                false                 | If true will auto login your facebook |


## onFailure callback

onFailure callback is called when either initialization or a signin attempt fails.

| property name |  value   |             definition               |
|:-------------:|:--------:|:------------------------------------:|
|   error       |  any     |           Error code                 |



More details can be found in the official Facebook docs:
 * [Facebook for developers](https://developers.facebook.com/docs/facebook-login/)


### 👉 Follow me on Youtube: [@devat-vietnam](https://www.youtube.com/c/DevATHTML)
### 👉 Buy Me a Coffee . Thank You ! 💗: (https://www.buymeacoffee.com/QK1DkYS)
