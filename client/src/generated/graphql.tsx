import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthError = {
  __typename?: 'AuthError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ChangePasswordError = {
  __typename?: 'ChangePasswordError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
  username: Scalars['String'];
};

export type ChangePasswordObjectType = {
  __typename?: 'ChangePasswordObjectType';
  error?: Maybe<ChangePasswordError>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ChangePasswordSettingError = {
  __typename?: 'ChangePasswordSettingError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ChangePasswordSettingInput = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type ChangePasswordSettingObjectType = {
  __typename?: 'ChangePasswordSettingObjectType';
  error?: Maybe<ChangePasswordSettingError>;
  success?: Maybe<Scalars['Boolean']>;
};

export type DeleteAccountError = {
  __typename?: 'DeleteAccountError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type DeleteAccountInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeleteAccountObjectType = {
  __typename?: 'DeleteAccountObjectType';
  error?: Maybe<DeleteAccountError>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Document = {
  __typename?: 'Document';
  createdAt: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  size: Scalars['Int'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPasswordEmail = {
  __typename?: 'ForgotPasswordEmail';
  field: Scalars['String'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type LoginObjectType = {
  __typename?: 'LoginObjectType';
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type Miscellaneous = {
  __typename?: 'Miscellaneous';
  createdAt: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  size: Scalars['Int'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type Music = {
  __typename?: 'Music';
  createdAt: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  size: Scalars['Int'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ChangePasswordObjectType;
  changePasswordSetting: ChangePasswordSettingObjectType;
  confirm: RegisterObjectType;
  deleteAccount: DeleteAccountObjectType;
  deleteDocument: Scalars['Boolean'];
  deleteFromTrash: Scalars['Boolean'];
  deleteMiscellaneous: Scalars['Boolean'];
  deleteMusic: Scalars['Boolean'];
  deletePicture: Scalars['Boolean'];
  deleteVideo: Scalars['Boolean'];
  emptyTrash: Scalars['Boolean'];
  login: LoginObjectType;
  logout: Scalars['Boolean'];
  register: RegisterObjectType;
  sendForgotPasswordEmail: ForgotPasswordEmail;
  unDeleteFile: Scalars['Boolean'];
  updateProfile: UpdateProfileResponse;
  updateStorage: Scalars['Boolean'];
  uploadDocument: UploadDocumentResponse;
  uploadMiscellaneous: UploadMiscellaneousResponse;
  uploadMusic: UploadMusicResponse;
  uploadPicture: UploadPictureResponse;
  uploadVideo: UploadVideoResponse;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangePasswordSettingArgs = {
  input: ChangePasswordSettingInput;
};


export type MutationConfirmArgs = {
  token: Scalars['String'];
  verificationCode: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};


export type MutationDeleteDocumentArgs = {
  id: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeleteFromTrashArgs = {
  id: Scalars['String'];
};


export type MutationDeleteMiscellaneousArgs = {
  id: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeleteMusicArgs = {
  id: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeletePictureArgs = {
  id: Scalars['String'];
  type: Scalars['String'];
};


export type MutationDeleteVideoArgs = {
  id: Scalars['String'];
  type: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars['String'];
};


export type MutationUnDeleteFileArgs = {
  id: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  banner?: InputMaybe<Scalars['Upload']>;
  input: UpdateInput;
  size: Scalars['Int'];
};


export type MutationUpdateStorageArgs = {
  size: Scalars['Float'];
};


export type MutationUploadDocumentArgs = {
  document: Scalars['Upload'];
  size: Scalars['Int'];
};


export type MutationUploadMiscellaneousArgs = {
  miscellaneous: Scalars['Upload'];
  size: Scalars['Int'];
};


export type MutationUploadMusicArgs = {
  music: Scalars['Upload'];
  size: Scalars['Int'];
};


export type MutationUploadPictureArgs = {
  picture: Scalars['Upload'];
  size: Scalars['Int'];
};


export type MutationUploadVideoArgs = {
  size: Scalars['Int'];
  video: Scalars['Upload'];
};

export type Picture = {
  __typename?: 'Picture';
  createdAt: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  size: Scalars['Int'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  admin: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  avatarSize: Scalars['Float'];
  banner?: Maybe<Scalars['String']>;
  bannerSize: Scalars['Float'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cookie: Scalars['Boolean'];
  helloWorld: Scalars['String'];
  lists: Array<Scalars['String']>;
  user?: Maybe<User>;
};


export type QueryCookieArgs = {
  cookie: Scalars['String'];
};


export type QueryListsArgs = {
  input: Array<Scalars['String']>;
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterObjectType = {
  __typename?: 'RegisterObjectType';
  error?: Maybe<AuthError>;
  user?: Maybe<User>;
};

export type Trash = {
  __typename?: 'Trash';
  createdAt: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  size: Scalars['Int'];
  type: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type UpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  verified?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateProfileResponse = {
  __typename?: 'UpdateProfileResponse';
  error?: Maybe<Error>;
  success: Scalars['Boolean'];
};

export type UploadDocumentResponse = {
  __typename?: 'UploadDocumentResponse';
  error?: Maybe<Error>;
  success: Scalars['Boolean'];
};

export type UploadMiscellaneousResponse = {
  __typename?: 'UploadMiscellaneousResponse';
  error?: Maybe<Error>;
  success: Scalars['Boolean'];
};

export type UploadMusicResponse = {
  __typename?: 'UploadMusicResponse';
  error?: Maybe<Error>;
  success: Scalars['Boolean'];
};

export type UploadPictureResponse = {
  __typename?: 'UploadPictureResponse';
  error?: Maybe<Error>;
  success: Scalars['Boolean'];
};

export type UploadVideoResponse = {
  __typename?: 'UploadVideoResponse';
  error?: Maybe<Error>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['String'];
  documents?: Maybe<Array<Document>>;
  email: Scalars['String'];
  isLoggedIn: Scalars['Boolean'];
  maxStorageSize: Scalars['Float'];
  miscellaneous?: Maybe<Array<Miscellaneous>>;
  musics?: Maybe<Array<Music>>;
  pictures?: Maybe<Array<Picture>>;
  profile?: Maybe<Profile>;
  theme: Scalars['String'];
  trash?: Maybe<Array<Trash>>;
  uid: Scalars['String'];
  updatedAt: Scalars['String'];
  usedStorage: Scalars['Float'];
  username: Scalars['String'];
  videos?: Maybe<Array<Video>>;
};

export type Video = {
  __typename?: 'Video';
  createdAt: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['String'];
  size: Scalars['Int'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};

export type MusicFragmentFragment = { __typename?: 'Music', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string };

export type PictureFragmentFragment = { __typename?: 'Picture', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string };

export type DocumentFragmentFragment = { __typename?: 'Document', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string };

export type VideoFragmentFragment = { __typename?: 'Video', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string };

export type MiscellaneousFragmentFragment = { __typename?: 'Miscellaneous', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string };

export type TrashFragmentFragment = { __typename?: 'Trash', id: string, url: string, type: string, filename: string, size: number, createdAt: string, updatedAt: string };

export type ProfileFragmentFragment = { __typename?: 'Profile', id: string, avatar?: string | null, banner?: string | null, admin: boolean, username: string, email: string, phoneNumber?: string | null, createdAt: string, updatedAt: string, bannerSize: number, avatarSize: number };

export type UserFragmentFragment = { __typename?: 'User', uid: string, username: string, email: string, isLoggedIn: boolean, confirmed: boolean, maxStorageSize: number, usedStorage: number, profile?: { __typename?: 'Profile', id: string, avatar?: string | null, banner?: string | null, admin: boolean, username: string, email: string, phoneNumber?: string | null, createdAt: string, updatedAt: string, bannerSize: number, avatarSize: number } | null };

export type ResetPasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordObjectType', success?: boolean | null, error?: { __typename?: 'ChangePasswordError', field: string, message: string } | null } };

export type ChangePasswordSettingMutationVariables = Exact<{
  input: ChangePasswordSettingInput;
}>;


export type ChangePasswordSettingMutation = { __typename?: 'Mutation', changePasswordSetting: { __typename?: 'ChangePasswordSettingObjectType', success?: boolean | null, error?: { __typename?: 'ChangePasswordSettingError', field: string, message: string } | null } };

export type DeleteAccountMutationVariables = Exact<{
  input: DeleteAccountInput;
}>;


export type DeleteAccountMutation = { __typename?: 'Mutation', deleteAccount: { __typename?: 'DeleteAccountObjectType', success?: boolean | null, error?: { __typename?: 'DeleteAccountError', message: string, field: string } | null } };

export type DeleteDocumentMutationVariables = Exact<{
  id: Scalars['String'];
  type: Scalars['String'];
}>;


export type DeleteDocumentMutation = { __typename?: 'Mutation', deleteDocument: boolean };

export type DeleteFromTrashMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFromTrashMutation = { __typename?: 'Mutation', deleteFromTrash: boolean };

export type DeleteMiscellaneousMutationVariables = Exact<{
  id: Scalars['String'];
  type: Scalars['String'];
}>;


export type DeleteMiscellaneousMutation = { __typename?: 'Mutation', deleteMiscellaneous: boolean };

export type DeleteMusicMutationVariables = Exact<{
  id: Scalars['String'];
  type: Scalars['String'];
}>;


export type DeleteMusicMutation = { __typename?: 'Mutation', deleteMusic: boolean };

export type DeletePictureMutationVariables = Exact<{
  id: Scalars['String'];
  type: Scalars['String'];
}>;


export type DeletePictureMutation = { __typename?: 'Mutation', deletePicture: boolean };

export type DeleteVideoMutationVariables = Exact<{
  id: Scalars['String'];
  type: Scalars['String'];
}>;


export type DeleteVideoMutation = { __typename?: 'Mutation', deleteVideo: boolean };

export type EmptyTrashMutationVariables = Exact<{ [key: string]: never; }>;


export type EmptyTrashMutation = { __typename?: 'Mutation', emptyTrash: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginObjectType', user?: { __typename?: 'User', uid: string, username: string, email: string, isLoggedIn: boolean, confirmed: boolean, maxStorageSize: number, usedStorage: number, profile?: { __typename?: 'Profile', id: string, avatar?: string | null, banner?: string | null, admin: boolean, username: string, email: string, phoneNumber?: string | null, createdAt: string, updatedAt: string, bannerSize: number, avatarSize: number } | null } | null, error?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterObjectType', error?: { __typename?: 'AuthError', field: string, message: string } | null, user?: { __typename?: 'User', uid: string, username: string, email: string, isLoggedIn: boolean, confirmed: boolean, maxStorageSize: number, usedStorage: number, profile?: { __typename?: 'Profile', id: string, avatar?: string | null, banner?: string | null, admin: boolean, username: string, email: string, phoneNumber?: string | null, createdAt: string, updatedAt: string, bannerSize: number, avatarSize: number } | null } | null } };

export type RequestForgotPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RequestForgotPasswordEmailMutation = { __typename?: 'Mutation', sendForgotPasswordEmail: { __typename?: 'ForgotPasswordEmail', field: string, message: string, success: boolean } };

export type UndoDeleteFileMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UndoDeleteFileMutation = { __typename?: 'Mutation', unDeleteFile: boolean };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateInput;
  avatar?: InputMaybe<Scalars['Upload']>;
  banner?: InputMaybe<Scalars['Upload']>;
  size: Scalars['Int'];
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'UpdateProfileResponse', success: boolean, error?: { __typename?: 'Error', field: string, message: string } | null } };

export type UpdateUserStorageMutationVariables = Exact<{
  size: Scalars['Float'];
}>;


export type UpdateUserStorageMutation = { __typename?: 'Mutation', updateStorage: boolean };

export type UploadDocumentMutationVariables = Exact<{
  document: Scalars['Upload'];
  size: Scalars['Int'];
}>;


export type UploadDocumentMutation = { __typename?: 'Mutation', uploadDocument: { __typename?: 'UploadDocumentResponse', success: boolean, error?: { __typename?: 'Error', message: string, field: string } | null } };

export type UploadMiscellaneousMutationVariables = Exact<{
  miscellaneous: Scalars['Upload'];
  size: Scalars['Int'];
}>;


export type UploadMiscellaneousMutation = { __typename?: 'Mutation', uploadMiscellaneous: { __typename?: 'UploadMiscellaneousResponse', success: boolean, error?: { __typename?: 'Error', message: string, field: string } | null } };

export type UploadMusicMutationVariables = Exact<{
  music: Scalars['Upload'];
  size: Scalars['Int'];
}>;


export type UploadMusicMutation = { __typename?: 'Mutation', uploadMusic: { __typename?: 'UploadMusicResponse', success: boolean, error?: { __typename?: 'Error', message: string, field: string } | null } };

export type UploadPicturesMutationVariables = Exact<{
  picture: Scalars['Upload'];
  size: Scalars['Int'];
}>;


export type UploadPicturesMutation = { __typename?: 'Mutation', uploadPicture: { __typename?: 'UploadPictureResponse', success: boolean, error?: { __typename?: 'Error', message: string, field: string } | null } };

export type UploadVideoMutationVariables = Exact<{
  video: Scalars['Upload'];
  size: Scalars['Int'];
}>;


export type UploadVideoMutation = { __typename?: 'Mutation', uploadVideo: { __typename?: 'UploadVideoResponse', success: boolean, error?: { __typename?: 'Error', message: string, field: string } | null } };

export type ConfirmMutationVariables = Exact<{
  verificationCode: Scalars['String'];
  token: Scalars['String'];
}>;


export type ConfirmMutation = { __typename?: 'Mutation', confirm: { __typename?: 'RegisterObjectType', user?: { __typename?: 'User', uid: string, username: string, email: string, isLoggedIn: boolean, confirmed: boolean, maxStorageSize: number, usedStorage: number, profile?: { __typename?: 'Profile', id: string, avatar?: string | null, banner?: string | null, admin: boolean, username: string, email: string, phoneNumber?: string | null, createdAt: string, updatedAt: string, bannerSize: number, avatarSize: number } | null } | null, error?: { __typename?: 'AuthError', field: string, message: string } | null } };

export type CookieQueryVariables = Exact<{
  cookie: Scalars['String'];
}>;


export type CookieQuery = { __typename?: 'Query', cookie: boolean };

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'Query', helloWorld: string };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', uid: string, username: string, email: string, isLoggedIn: boolean, confirmed: boolean, maxStorageSize: number, usedStorage: number, musics?: Array<{ __typename?: 'Music', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string }> | null, pictures?: Array<{ __typename?: 'Picture', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string }> | null, miscellaneous?: Array<{ __typename?: 'Miscellaneous', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string }> | null, videos?: Array<{ __typename?: 'Video', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string }> | null, documents?: Array<{ __typename?: 'Document', id: string, url: string, filename: string, size: number, createdAt: string, updatedAt: string }> | null, trash?: Array<{ __typename?: 'Trash', id: string, url: string, type: string, filename: string, size: number, createdAt: string, updatedAt: string }> | null, profile?: { __typename?: 'Profile', id: string, avatar?: string | null, banner?: string | null, admin: boolean, username: string, email: string, phoneNumber?: string | null, createdAt: string, updatedAt: string, bannerSize: number, avatarSize: number } | null } | null };

export const MusicFragmentFragmentDoc = gql`
    fragment MusicFragment on Music {
  id
  url
  filename
  size
  createdAt
  updatedAt
}
    `;
export const PictureFragmentFragmentDoc = gql`
    fragment PictureFragment on Picture {
  id
  url
  filename
  size
  createdAt
  updatedAt
}
    `;
export const DocumentFragmentFragmentDoc = gql`
    fragment DocumentFragment on Document {
  id
  url
  filename
  size
  createdAt
  updatedAt
}
    `;
export const VideoFragmentFragmentDoc = gql`
    fragment VideoFragment on Video {
  id
  url
  filename
  size
  createdAt
  updatedAt
}
    `;
export const MiscellaneousFragmentFragmentDoc = gql`
    fragment MiscellaneousFragment on Miscellaneous {
  id
  url
  filename
  size
  createdAt
  updatedAt
}
    `;
export const TrashFragmentFragmentDoc = gql`
    fragment TrashFragment on Trash {
  id
  url
  type
  filename
  size
  createdAt
  updatedAt
}
    `;
export const ProfileFragmentFragmentDoc = gql`
    fragment ProfileFragment on Profile {
  id
  avatar
  banner
  admin
  username
  email
  phoneNumber
  createdAt
  updatedAt
  bannerSize
  avatarSize
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  uid
  username
  email
  isLoggedIn
  confirmed
  maxStorageSize
  usedStorage
  profile {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    success
    error {
      field
      message
    }
  }
}
    `;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const ChangePasswordSettingDocument = gql`
    mutation ChangePasswordSetting($input: ChangePasswordSettingInput!) {
  changePasswordSetting(input: $input) {
    success
    error {
      field
      message
    }
  }
}
    `;

export function useChangePasswordSettingMutation() {
  return Urql.useMutation<ChangePasswordSettingMutation, ChangePasswordSettingMutationVariables>(ChangePasswordSettingDocument);
};
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($input: DeleteAccountInput!) {
  deleteAccount(input: $input) {
    success
    error {
      message
      field
    }
  }
}
    `;

export function useDeleteAccountMutation() {
  return Urql.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument);
};
export const DeleteDocumentDocument = gql`
    mutation DeleteDocument($id: String!, $type: String!) {
  deleteDocument(id: $id, type: $type)
}
    `;

export function useDeleteDocumentMutation() {
  return Urql.useMutation<DeleteDocumentMutation, DeleteDocumentMutationVariables>(DeleteDocumentDocument);
};
export const DeleteFromTrashDocument = gql`
    mutation DeleteFromTrash($id: String!) {
  deleteFromTrash(id: $id)
}
    `;

export function useDeleteFromTrashMutation() {
  return Urql.useMutation<DeleteFromTrashMutation, DeleteFromTrashMutationVariables>(DeleteFromTrashDocument);
};
export const DeleteMiscellaneousDocument = gql`
    mutation DeleteMiscellaneous($id: String!, $type: String!) {
  deleteMiscellaneous(id: $id, type: $type)
}
    `;

export function useDeleteMiscellaneousMutation() {
  return Urql.useMutation<DeleteMiscellaneousMutation, DeleteMiscellaneousMutationVariables>(DeleteMiscellaneousDocument);
};
export const DeleteMusicDocument = gql`
    mutation DeleteMusic($id: String!, $type: String!) {
  deleteMusic(id: $id, type: $type)
}
    `;

export function useDeleteMusicMutation() {
  return Urql.useMutation<DeleteMusicMutation, DeleteMusicMutationVariables>(DeleteMusicDocument);
};
export const DeletePictureDocument = gql`
    mutation DeletePicture($id: String!, $type: String!) {
  deletePicture(id: $id, type: $type)
}
    `;

export function useDeletePictureMutation() {
  return Urql.useMutation<DeletePictureMutation, DeletePictureMutationVariables>(DeletePictureDocument);
};
export const DeleteVideoDocument = gql`
    mutation DeleteVideo($id: String!, $type: String!) {
  deleteVideo(id: $id, type: $type)
}
    `;

export function useDeleteVideoMutation() {
  return Urql.useMutation<DeleteVideoMutation, DeleteVideoMutationVariables>(DeleteVideoDocument);
};
export const EmptyTrashDocument = gql`
    mutation EmptyTrash {
  emptyTrash
}
    `;

export function useEmptyTrashMutation() {
  return Urql.useMutation<EmptyTrashMutation, EmptyTrashMutationVariables>(EmptyTrashDocument);
};
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      ...UserFragment
    }
    error {
      field
      message
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    error {
      field
      message
    }
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RequestForgotPasswordEmailDocument = gql`
    mutation RequestForgotPasswordEmail($email: String!) {
  sendForgotPasswordEmail(email: $email) {
    field
    message
    success
  }
}
    `;

export function useRequestForgotPasswordEmailMutation() {
  return Urql.useMutation<RequestForgotPasswordEmailMutation, RequestForgotPasswordEmailMutationVariables>(RequestForgotPasswordEmailDocument);
};
export const UndoDeleteFileDocument = gql`
    mutation UndoDeleteFile($id: String!) {
  unDeleteFile(id: $id)
}
    `;

export function useUndoDeleteFileMutation() {
  return Urql.useMutation<UndoDeleteFileMutation, UndoDeleteFileMutationVariables>(UndoDeleteFileDocument);
};
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateInput!, $avatar: Upload, $banner: Upload, $size: Int!) {
  updateProfile(input: $input, banner: $banner, avatar: $avatar, size: $size) {
    success
    error {
      field
      message
    }
  }
}
    `;

export function useUpdateProfileMutation() {
  return Urql.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument);
};
export const UpdateUserStorageDocument = gql`
    mutation UpdateUserStorage($size: Float!) {
  updateStorage(size: $size)
}
    `;

export function useUpdateUserStorageMutation() {
  return Urql.useMutation<UpdateUserStorageMutation, UpdateUserStorageMutationVariables>(UpdateUserStorageDocument);
};
export const UploadDocumentDocument = gql`
    mutation UploadDocument($document: Upload!, $size: Int!) {
  uploadDocument(document: $document, size: $size) {
    success
    error {
      message
      field
    }
  }
}
    `;

export function useUploadDocumentMutation() {
  return Urql.useMutation<UploadDocumentMutation, UploadDocumentMutationVariables>(UploadDocumentDocument);
};
export const UploadMiscellaneousDocument = gql`
    mutation UploadMiscellaneous($miscellaneous: Upload!, $size: Int!) {
  uploadMiscellaneous(miscellaneous: $miscellaneous, size: $size) {
    success
    error {
      message
      field
    }
  }
}
    `;

export function useUploadMiscellaneousMutation() {
  return Urql.useMutation<UploadMiscellaneousMutation, UploadMiscellaneousMutationVariables>(UploadMiscellaneousDocument);
};
export const UploadMusicDocument = gql`
    mutation UploadMusic($music: Upload!, $size: Int!) {
  uploadMusic(music: $music, size: $size) {
    success
    error {
      message
      field
    }
  }
}
    `;

export function useUploadMusicMutation() {
  return Urql.useMutation<UploadMusicMutation, UploadMusicMutationVariables>(UploadMusicDocument);
};
export const UploadPicturesDocument = gql`
    mutation UploadPictures($picture: Upload!, $size: Int!) {
  uploadPicture(picture: $picture, size: $size) {
    success
    error {
      message
      field
    }
  }
}
    `;

export function useUploadPicturesMutation() {
  return Urql.useMutation<UploadPicturesMutation, UploadPicturesMutationVariables>(UploadPicturesDocument);
};
export const UploadVideoDocument = gql`
    mutation UploadVideo($video: Upload!, $size: Int!) {
  uploadVideo(video: $video, size: $size) {
    success
    error {
      message
      field
    }
  }
}
    `;

export function useUploadVideoMutation() {
  return Urql.useMutation<UploadVideoMutation, UploadVideoMutationVariables>(UploadVideoDocument);
};
export const ConfirmDocument = gql`
    mutation Confirm($verificationCode: String!, $token: String!) {
  confirm(verificationCode: $verificationCode, token: $token) {
    user {
      ...UserFragment
    }
    error {
      field
      message
    }
  }
}
    ${UserFragmentFragmentDoc}`;

export function useConfirmMutation() {
  return Urql.useMutation<ConfirmMutation, ConfirmMutationVariables>(ConfirmDocument);
};
export const CookieDocument = gql`
    query Cookie($cookie: String!) {
  cookie(cookie: $cookie)
}
    `;

export function useCookieQuery(options: Omit<Urql.UseQueryArgs<CookieQueryVariables>, 'query'>) {
  return Urql.useQuery<CookieQuery>({ query: CookieDocument, ...options });
};
export const HelloWorldDocument = gql`
    query HelloWorld {
  helloWorld
}
    `;

export function useHelloWorldQuery(options?: Omit<Urql.UseQueryArgs<HelloWorldQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloWorldQuery>({ query: HelloWorldDocument, ...options });
};
export const UserDocument = gql`
    query User {
  user {
    ...UserFragment
    musics {
      ...MusicFragment
    }
    pictures {
      ...PictureFragment
    }
    miscellaneous {
      ...MiscellaneousFragment
    }
    videos {
      ...VideoFragment
    }
    documents {
      ...DocumentFragment
    }
    trash {
      ...TrashFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${MusicFragmentFragmentDoc}
${PictureFragmentFragmentDoc}
${MiscellaneousFragmentFragmentDoc}
${VideoFragmentFragmentDoc}
${DocumentFragmentFragmentDoc}
${TrashFragmentFragmentDoc}`;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};