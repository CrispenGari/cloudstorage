import { ___client__base__url__ } from "../constants";
import { User } from "../entities/User/User";

export const resetPasswordEmailTemplate = (
  user: User,
  token: string
): string => {
  return `<div>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
          Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
      .reset__password__link {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        padding: 20px 10px;
        border: 1px solid lightblue;
        margin: 10px 0;
      }
      .logo__container {
        margin: 10px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .logo__container > img {
        width: 100px;
        user-select: none;
        -webkit-user-drag: none;
      }
      .logo__container > p {
        color: gray;
        font-size: 0.8rem;
      }
    </style>
    <b>Hi, ${user.username}</b>
  
    <div class="logo__container">
        <p>cloudstorage</p>
    </div>
  
    <p>
      We have received an email request at <b>(${user.email})</b> for account
      password reset. If you intent to reset your password on your Cloud Storage account
      click <b>"RESET PASSWORD"</b> link bellow.
    </p>
    <div class="reset__password__link">
      <a
        href="${___client__base__url__}/auth/new-pwd?token=${token}&username=${user.username}"
        >RESET PASSWORD</a
      >
    </div>
    <p>If you did not intent to reset your password just ignore this email.</p>
    <br />
    <br />
    <p><b>Kind Regards</b></p>
    <br />
    <p><b>Cloud Storage</b></p>
  </div>`;
};

export const confirmEmailTemplate = (
  user: User,
  verificationCode: number | string
) => {
  return `
    <div>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
    .confirm__password__link {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 20px 10px;
      border: 1px solid lightblue;
      margin: 10px 0;
    }
    .logo__container {
      margin: 10px 0;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .logo__container > img {
      width: 100px;
      user-select: none;
      -webkit-user-drag: none;
    }
    .logo__container > p {
      color: gray;
      font-size: 0.8rem;
    }
    .confirm__password__link > h4 {
      color: cornflowerblue;
      width: 100%;
      text-align: center;
    }
  </style>
  <b>Hi, ${user.username}</b>

  <div class="logo__container">
    <p>cloudstorage</p>
  </div>
  <p>
    We have a new account creation request at your email (${user.email}). If you
    intent to join Cloud Storage please verify your email. The verification code
    is:
  </p>
  <div class="confirm__password__link">
    <h4>${verificationCode}</h4>
  </div>
  <p>
    If you did not intent to create a Cloud Storage account ignore this email.
  </p>
  <br />
  <br />
  <p><b>Kind Regards</b></p>
  <br />
  <p><b>Cloud Storage</b></p>
</div>
    `;
};
