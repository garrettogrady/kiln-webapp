import React, { useEffect, useState } from 'react';
import {router} from "next/client";
import {useRouter} from "next/navigation";
import UserForm from "@/app/ui/onboard/creator-form";

declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

const InstagramConnectButton: React.FC = () => {
    const [isFBReady, setIsFBReady] = useState(false);
    const [isFBDone, setIsFBDone] = useState(false);
    console.log( process.env.NEXT_PUBLIC_FACEBOOK_APP_ID);
    console.log( process.env.NEXT_PUBLIC_NGROK_URL);


    useEffect(() => {
        const loadFacebookSDK = () => {
            console.log("loading fb UI")
            return new Promise<void>((resolve) => {
                // Load the SDK asynchronously
                (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js = d.createElement(s) as HTMLScriptElement;
                    js.id = id;
                    js.src = "https://connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode!.insertBefore(js, fjs);
                    (js as HTMLScriptElement).onload = resolve;
                }(document, 'script', 'facebook-jssdk'));
            });
        };

        const initFacebookSDK = () => {
            return new Promise<void>((resolve) => {
                window.fbAsyncInit = function() {
                    window.FB.init({
                        appId            : process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
                        autoLogAppEvents : true,
                        xfbml            : true,
                        version          : 'v12.0'
                    });
                    resolve();
                };
            });
        };

        const setupFacebook = async () => {
            await loadFacebookSDK();
            await initFacebookSDK();
            setIsFBReady(true);
        };

        setupFacebook();
    }, []);

    const handleInstagramConnect = () => {
        if (!isFBReady) {
            console.error('Facebook SDK is not ready yet');
            return;
        }

        const redirectUri = process.env.NEXT_PUBLIC_NGROK_URL

        window.FB.login((response: any) => {
            if (response.authResponse) {
                const accessToken = response.authResponse.accessToken;
                sendTokenToBackend(accessToken);
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            scope: 'instagram_basic,pages_show_list',
            return_scopes: true,
            auth_type: 'rerequest',
            redirect_uri: redirectUri
        });
    };

    const sendTokenToBackend = async (token: string) => {
        try {
            const response = await fetch('/api/instagram-connect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken: token }),
            });
            const data = await response.json();
            console.log('Instagram connected successfully:', data);
        } catch (error) {
            console.error('Error connecting Instagram:', error);
        }
        setIsFBDone(true);
    };

    return (
        <>
            {!isFBDone && (
            <button
                onClick={handleInstagramConnect}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={!isFBReady}
            >
                Connect Instagram
            </button>

            )}
            {isFBDone && (
              <p>Instagram connected!</p>

            )}
        </>
    );
};

export default InstagramConnectButton;