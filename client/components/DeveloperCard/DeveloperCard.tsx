import React from "react";
import {
  useGenerateCredentialsMutation,
  useUserQuery,
} from "../../src/generated/graphql";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import styles from "./DeveloperCard.module.css";
import { Alert } from "@material-ui/lab";

const DeveloperCard = () => {
  const [apiKey, setApiKey] = React.useState("");
  const [apiSecret, setApiSecret] = React.useState("");
  const [error, setError] = React.useState("");
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [showSecretKey, setShowSecretKey] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [{ data }, refetchUser] = useUserQuery({
    requestPolicy: "network-only",
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      setApiKey(data.user?.apiKey);
      setApiSecret(data?.user?.apiSecretKey);
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  const [{ fetching }, generateCredentials] = useGenerateCredentialsMutation();

  const apiKeyRef = React.useRef(null);
  const secreteKeyRef = React.useRef(null);
  const generateDeveloperKeys = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateCredentials();
    await refetchUser({
      requestPolicy: "network-only",
    });
  };

  return (
    <form className={styles.developer__card} onSubmit={generateDeveloperKeys}>
      <h1>Developers</h1>
      <p>
        If you are a <strong>developer</strong> and you want to programmatically
        interact with our <strong>Application Programming Interface</strong>{" "}
        (API) you need to generate the <strong>API KEY</strong> and{" "}
        <strong>API SECRET</strong> by clicking on the [GENERATE CREDENTIALS]
        button. To generate new KEYS you can click the [RE-GENERATE CREDENTIALS]
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
                  setMessage("Copied SECRETE KEY to clipboard.");
                  setTimeout(() => {
                    setMessage("");
                  }, 3000);
                } else {
                  document.execCommand("copy");
                  setMessage("Copied SECRETE KEY to clipboard.");
                  setTimeout(() => {
                    setMessage("");
                  }, 3000);
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
                  setMessage("Copied API KEY to clipboard.");
                  setTimeout(() => {
                    setMessage("");
                  }, 3000);
                } else {
                  document.execCommand("copy");
                  setMessage("Copied API KEY to clipboard.");
                  setTimeout(() => {
                    setMessage("");
                  }, 3000);
                }
              }}
            >
              copy
            </button>
          </div>
        </div>
      </div>
      {message && (
        <Alert
          severity="success"
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {message}
        </Alert>
      )}
      <p>{error}</p>
      <p>
        Keep these credentials secret, if you are a developer we recommend you
        to store then as environmental variables. Because anyone with these
        credentials will be able to interact with your{" "}
        <strong>cloudstorage</strong> account on your behalf.
      </p>
      <button type="submit" disabled={fetching}>
        {apiKey ? "RE-GENERATE CREDENTIALS" : "GENERATE CREDENTIALS"}
      </button>
    </form>
  );
};

export default DeveloperCard;
