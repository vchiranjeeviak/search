import React, { useEffect, useState } from "react";
import { loadGoogleAPI } from "../utils/googleApi";
// import { config } from "dotenv";

// config();

function Buttons() {
  const [gapi, setGapi] = useState();
  const [googleAuth, setGoogleAuth] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSuccess = (googleUser) => {
    setIsLoggedIn(true);
  };

  const onFailure = () => {
    setIsLoggedIn(false);
  };

  const logOut = () => {
    (async () => {
      await googleAuth.signOut();
      setIsLoggedIn(false);
      renderSigninButton(gapi);
    })();
  };

  const renderSigninButton = (_gapi) => {
    _gapi.signin2.render("google-signin", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  };

  useEffect(() => {
    //window.gapi is available at this point
    window.onGoogleScriptLoad = () => {
      const _gapi = window.gapi;
      setGapi(_gapi);

      _gapi.load("auth2", () => {
        (async () => {
          const _googleAuth = await _gapi.auth2.init({
            client_id:
              "1050601508510-lun638o2cj95p61vspns8jjntul6o671.apps.googleusercontent.com",
          });
          setGoogleAuth(_googleAuth);
          renderSigninButton(_gapi);
        })();
      });
    };

    //ensure everything is set before loading the script
    loadGoogleAPI();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!isLoggedIn && <div id="google-signin"></div>}
      </header>
    </div>
  );
}

export default Buttons;
