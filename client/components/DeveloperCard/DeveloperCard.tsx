import React from "react";
import {
  useDeleteAccountMutation,
  useLogoutMutation,
  useUserQuery,
} from "../../src/generated/graphql";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import styles from "./DeveloperCard.module.css";
const DeveloperCard = () => {
  const [apiKey, setApiKey] = React.useState("");
  const [apiSecret, setApiSecret] = React.useState("");
  const [error, setError] = React.useState("");
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [showSecretKey, setShowSecretKey] = React.useState(false);

  const apiKeyRef = React.useRef(null);
  const secreteKeyRef = React.useRef(null);

  const generateDeveloperKeys = async () => {};

  return (
    <form className={styles.developer__card} onSubmit={generateDeveloperKeys}>
      <h1>Developers</h1>
      <p>
        If you are a <strong>developer</strong> and you want to programmatically
        interact with our <strong>Application Programming Interface</strong>{" "}
        (API) you need to generate the <strong>API KEY</strong> and{" "}
        <strong>API SECRET</strong> by clicking on the [GENERATE CREDENTIALS]
        button.
      </p>
      <div>
        <div>
          <p>API SECRET</p>
          <div>
            <div className={styles.developer__card__input}>
              <input
                value={apiSecret}
                readOnly
                type={showSecretKey ? "text" : "password"}
                placeholder="API SECRET"
                ref={secreteKeyRef}
              />
              {!showSecretKey ? (
                <IoMdEyeOff
                  onClick={() => {
                    secreteKeyRef?.current?.setAttribute("type", "text");
                    setShowSecretKey(true);
                  }}
                  title={"show secrete key"}
                  className={styles.developer__card__input__eye}
                />
              ) : (
                <IoMdEye
                  onClick={() => {
                    secreteKeyRef?.current?.setAttribute("type", "password");
                    setShowSecretKey(false);
                  }}
                  title={"hide secrete key"}
                  className={styles.developer__card__input__eye}
                />
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                // copy the SECRETE KEY
                secreteKeyRef?.current?.focus();
                secreteKeyRef?.current?.select();
                if (showSecretKey === false) {
                  secreteKeyRef?.current?.setAttribute("type", "text");
                  document.execCommand("copy");
                  secreteKeyRef?.current?.setAttribute("type", "password");
                  alert("Copied SECRETE KEY to clipboard.");
                } else {
                  document.execCommand("copy");
                  alert("Copied SECRETE KEY to clipboard.");
                }
              }}
            >
              copy
            </button>
          </div>
        </div>
        <div>
          <p>API KEY</p>
          <div>
            <div className={styles.developer__card__input}>
              <input
                value={apiKey}
                readOnly
                type="password"
                placeholder="API KEY"
                ref={apiKeyRef}
              />
              {!showApiKey ? (
                <IoMdEyeOff
                  onClick={() => {
                    apiKeyRef?.current?.setAttribute("type", "text");
                    setShowApiKey(true);
                  }}
                  title={"show api key"}
                  className={styles.developer__card__input__eye}
                />
              ) : (
                <IoMdEye
                  onClick={() => {
                    apiKeyRef?.current?.setAttribute("type", "password");
                    setShowApiKey(false);
                  }}
                  title={"hide api key"}
                  className={styles.developer__card__input__eye}
                />
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                // copy the api key
                apiKeyRef?.current?.focus();
                apiKeyRef?.current?.select();
                if (showApiKey === false) {
                  apiKeyRef?.current?.setAttribute("type", "text");
                  document.execCommand("copy");
                  apiKeyRef?.current?.setAttribute("type", "password");
                  alert("Copied API KEY to clipboard.");
                } else {
                  document.execCommand("copy");
                  alert("Copied API KEY to clipboard.");
                }
              }}
            >
              copy
            </button>
          </div>
        </div>
      </div>
      <p>{error}</p>
      <p>
        Keep these credentials secret, if you are a developer we recommend you
        to store then as environmental variables. Because anyone with these
        credentials will be able to interact with your{" "}
        <strong>cloudstorage</strong> account on your behalf.
      </p>
      <button type="submit">GENERATE CREDENTIALS</button>
    </form>
  );
};

export default DeveloperCard;
