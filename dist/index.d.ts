/// <reference types="react" />
import './public/styles.css';
export declare const FacebookLogin: {
    ({ language, appId, version, scope, fields, height, theme, imgSrc, btnText, onSuccess, onFailure, isSignedIn }: FacebookLoginProps): JSX.Element;
    defaultProps: {
        language: string;
        version: string;
        scope: string;
        fields: string;
        height: string;
        theme: string;
        imgSrc: any;
        btnText: string;
        onSuccess: (response: FacebookLoginAuthResponse) => void;
        onFailure: (error: any) => void;
        isSignedIn: boolean;
    };
};
export default FacebookLogin;
export interface FacebookLoginProps {
    appId: string;
    version: string;
    scope: string;
    fields: string;
    height: string;
    theme: string;
    imgSrc: string;
    btnText: string;
    onSuccess: (response: FacebookLoginAuthResponse) => void;
    onFailure: (error: any) => void;
    isSignedIn: boolean;
    language: string;
}
export interface FacebookLoginAuthResponse {
    authResponse: {
        accessToken: string;
        data_access_expiration_time: number;
        expiresIn: number;
        graphDomain: string;
        signedRequest: string;
        userID: string;
    };
    status: string;
    user?: FacebookLoginUser;
}
export interface FacebookLoginUser {
    id: string;
    email?: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    short_name?: string;
    picture?: {
        data: {
            height?: number;
            is_silhouette?: boolean;
            url?: string;
            width?: number;
        };
    };
}
//# sourceMappingURL=index.d.ts.map