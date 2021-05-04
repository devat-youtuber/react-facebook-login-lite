"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookLogin = void 0;
var react_1 = __importStar(require("react"));
// @ts-ignore
var facebook_png_1 = __importDefault(require("./public/facebook.png"));
require("./public/styles.css");
var FacebookLogin = function (_a) {
    var language = _a.language, appId = _a.appId, version = _a.version, scope = _a.scope, fields = _a.fields, height = _a.height, theme = _a.theme, imgSrc = _a.imgSrc, btnText = _a.btnText, onSuccess = _a.onSuccess, onFailure = _a.onFailure, isSignedIn = _a.isSignedIn;
    var _b = react_1.useState(), fbWindow = _b[0], setFBWindow = _b[1];
    react_1.useEffect(function () {
        var script = document.createElement('script');
        script.src = "https://connect.facebook.net/" + language + "/sdk.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = "anonymous";
        script.addEventListener('load', function () {
            var FB = window.FB;
            FB.init({
                appId: appId,
                cookie: true,
                xfbml: true,
                version: version
            });
            setFBWindow(window);
        });
        document.body.appendChild(script);
        return function () {
            document.body.removeChild(script);
        };
    }, [language, appId, version]);
    var statusChangeCallback = function (response) {
        if (response.status === 'connected') {
            fetchDataFacebook(response);
        }
        else if (response.status === 'not_authorized') {
            onFailure('Import error, Authorize app to import data, error');
        }
        else {
            onFailure('Import error, Error occured while importing data, error');
        }
    };
    var facebookLogin = function () {
        fbWindow.FB.login(function (response) {
            statusChangeCallback(response);
        }, { scope: scope });
    };
    var fetchDataFacebook = function (response) {
        fbWindow.FB.api('/me', { fields: fields.split(', ') }, function (user) {
            onSuccess(__assign({ user: user }, response));
        });
    };
    react_1.useEffect(function () {
        if (!isSignedIn || !fbWindow)
            return;
        fbWindow.FB.getLoginStatus(function (response) {
            return statusChangeCallback(response);
        });
        // eslint-disable-next-line
    }, [isSignedIn, fbWindow]);
    return (react_1.default.createElement("div", { id: "fb-login", style: { height: height }, onClick: facebookLogin, className: theme === 'dark' ? 'dark' : 'light' },
        react_1.default.createElement("img", { src: imgSrc, title: "facebook login", alt: "facebook", style: { objectFit: 'cover' } }),
        react_1.default.createElement("span", null, btnText)));
};
exports.FacebookLogin = FacebookLogin;
exports.FacebookLogin.defaultProps = {
    language: 'en_US',
    version: 'v10.0',
    scope: 'public_profile,email',
    fields: "id,email,first_name,last_name,middle_name,name,picture,short_name",
    height: '50px',
    theme: 'light',
    imgSrc: facebook_png_1.default,
    btnText: 'Sign in with Facebook',
    onSuccess: function (response) {
        console.log(response);
    },
    onFailure: function (error) {
        console.log(error);
    },
    isSignedIn: false
};
exports.default = exports.FacebookLogin;
//# sourceMappingURL=index.js.map