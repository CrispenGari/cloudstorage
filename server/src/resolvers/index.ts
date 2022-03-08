import { NonEmptyArray } from "type-graphql";
import { CookieResolver } from "./auth/CookieResolver";
import { DeleteDocumentResolver } from "./doccuments/DeleteDocumentResolver";
import { UploadDocumentResolver } from "./doccuments/UploadDocument";
import { HelloWorldResolver } from "./hello/HelloWorldResolver";
import { DeleteMiscellaneousResolver } from "./miscellaneous/DeleteMiscellaneousResolver";
import { UploadMiscellaneousResolver } from "./miscellaneous/UploadMiscellaneousResolver";
import { DeleteMusicResolver } from "./musics/DeleteMusicResolver";
import { UploadMusicResolver } from "./musics/UploadMusicResolver";
import { DeletePictureResolver } from "./pictures/DeletePictureResolver";
import { UploadPictureResolver } from "./pictures/UploadPictureResolver";
import { UpdateStorageResolver } from "./storage/UpdateStorageResolver";
import { DeleteFromTrashResolver } from "./trash/DeleteFromTrashResolver";
import { EmptyTrashResolver } from "./trash/EmptyTrashResolver";
import { UnDeleteFromTrashResolver } from "./trash/UnDeleteFromTrashResolver";
import { ChangePasswordSetting } from "./user/ChangePassoword";
import { ChangePasswordResolver } from "./user/ChangePasswordResolver";
import { VerifyEmailResolver } from "./user/CorfirmEmail";
import { DeleteAccount } from "./user/DeleteAccount";
import { LoginResolver } from "./user/Login";
import { LogoutResolver } from "./user/Logout";
import { RegisterResolver } from "./user/Register";
import { RequestForgotPasswordEmailResolver } from "./user/RequestForgotPasswordResolver";
import { UpdateProfileResolver } from "./user/UpdateProfile";
import { UserResolver } from "./user/UserResolver";
import { DeleteVideoResolver } from "./videos/DeleteVideoResolver";
import { UploadVideoResolver } from "./videos/UploadVideoResolver";

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  HelloWorldResolver,
  RegisterResolver,
  UserResolver,
  LoginResolver,
  VerifyEmailResolver,
  UpdateProfileResolver,
  LogoutResolver,
  UpdateProfileResolver,
  CookieResolver,
  ChangePasswordResolver,
  RequestForgotPasswordEmailResolver,
  UploadPictureResolver,
  DeletePictureResolver,
  UploadDocumentResolver,
  DeleteDocumentResolver,
  DeleteMusicResolver,
  UploadMusicResolver,
  UploadMiscellaneousResolver,
  DeleteMiscellaneousResolver,
  DeleteVideoResolver,
  UploadVideoResolver,
  DeleteAccount,
  ChangePasswordSetting,
  EmptyTrashResolver,
  DeleteFromTrashResolver,
  UnDeleteFromTrashResolver,
  UpdateStorageResolver,
];
