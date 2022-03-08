import React from "react";

import styles from "./Files.module.css";

import { IconButton, Checkbox, Tooltip } from "@material-ui/core";
import File from "../File/File";
import Modal from "../Modal/Modal";
import {
  useDeleteDocumentMutation,
  useDeleteFromTrashMutation,
  useDeleteMiscellaneousMutation,
  useDeleteMusicMutation,
  useDeletePictureMutation,
  useDeleteVideoMutation,
  useEmptyTrashMutation,
  useUndoDeleteFileMutation,
  useUpdateUserStorageMutation,
  useUploadDocumentMutation,
  useUploadMiscellaneousMutation,
  useUploadMusicMutation,
  useUploadPicturesMutation,
  useUploadVideoMutation,
  useUserQuery,
} from "../../src/generated/graphql";
import { LinearProgress } from "@material-ui/core";

import { setSelectedFiles as setSelectedFilesAction } from "../../actions";
import { AiOutlineDownload } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
interface Props {
  folder: string;
}
const Files: React.FC<Props> = ({ folder }) => {
  const [files, setFiles] = React.useState<any>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = React.useState<number>(0);
  const [uploaded, setUploaded] = React.useState<number>(0);
  const [progress, setProgress] = React.useState(0);
  const inputRef = React.useRef<any>(null);

  const markedFiles = useSelector((state: any) => state.selectedFiles);
  const dispatch = useDispatch();

  const [{ data: user, fetching: loadingUser }, refetchUserData] = useUserQuery(
    {
      requestPolicy: "network-only",
    }
  );
  const [{}, uploadPicture] = useUploadPicturesMutation();
  const [{}, uploadVideo] = useUploadVideoMutation();
  const [{}, uploadMusic] = useUploadMusicMutation();
  const [{}, uploadMiscellaneous] = useUploadMiscellaneousMutation();
  const [{}, uploadDocument] = useUploadDocumentMutation();
  const [{}, updateStorage] = useUpdateUserStorageMutation();
  const [{}, emptyTrash] = useEmptyTrashMutation();

  const [{}, deletePicture] = useDeletePictureMutation();

  const [{}, deleteVideo] = useDeleteVideoMutation();
  const [{}, deleteDocument] = useDeleteDocumentMutation();
  const [{}, deleteMiscellaneous] = useDeleteMiscellaneousMutation();
  const [{}, deleteMusic] = useDeleteMusicMutation();
  const [{}, deleteFromTrash] = useDeleteFromTrashMutation();
  const [{}, undoDelete] = useUndoDeleteFileMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFiles(e.target?.files);
    setSelectedFiles(e.target?.files?.length);
  };

  const uploadHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let totalUploadedBytes: number = 0;
    for (let i = 0; i < selectedFiles; i++) {
      setProgress(((i + 1) / selectedFiles) * 100);
      setUploaded(i + 1);
      const file = files[i];
      totalUploadedBytes += file?.size ?? 0;
      if (folder === "Pictures") {
        await uploadPicture({
          size: file?.size ?? 0,
          picture: file,
        });
      } else if (folder === "Documents") {
        await uploadDocument({
          size: file?.size ?? 0,
          document: file,
        });
      } else if (folder === "Miscellaneous") {
        await uploadMiscellaneous({
          size: file?.size ?? 0,
          miscellaneous: file,
        });
      } else if (folder === "Music") {
        await uploadMusic({
          size: file?.size ?? 0,
          music: file,
        });
      } else if (folder === "Videos") {
        await uploadVideo({
          size: file?.size ?? 0,
          video: file,
        });
      }
      await refetchUserData({ requestPolicy: "network-only" });
    }
    // console.log("updating storage");
    // await updateStorage({
    //   size: totalUploadedBytes,
    // });
    await refetchUserData({ requestPolicy: "network-only" });
  };

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && selectedFiles !== 0) {
      if (uploaded === selectedFiles) {
        setUploaded(0);
        setFiles(null);
        setSelectedFiles(0);
        setProgress(0);
        setOpen(false);
      }
    }
    return () => {
      mounted = false;
    };
  }, [selectedFiles, uploaded]);

  const emptyTrashHandler = async () => {
    await emptyTrash();
    await refetchUserData({
      requestPolicy: "network-only",
    });
  };

  const deleteSelected = () => {
    markedFiles?.forEach(async (file) => {
      if (file?.__typename === "Music") {
        await deleteMusic({ id: file?.id, type: file?.__typename });
      }
      if (file?.__typename === "Document") {
        await deleteDocument({ id: file?.id, type: file?.__typename });
      }
      if (file?.__typename === "Video") {
        await deleteVideo({ id: file?.id, type: file?.__typename });
      }
      if (file?.__typename === "Picture") {
        await deletePicture({
          id: file?.id,
          type: file?.__typename,
        });
      }
      if (file?.__typename === "Miscellaneous") {
        await deleteMiscellaneous({
          id: file?.id,
          type: file?.__typename,
        });
      }
      if (file?.__typename === "Trash") {
        await deleteFromTrash({
          id: file?.id,
        });
      }
      await refetchUserData({
        requestPolicy: "network-only",
      });
    });
    dispatch(setSelectedFilesAction([]));
  };
  const downloadSelected = () => {
    markedFiles?.forEach(async (file) => {
      await saveAs(file?.url, file?.filename);
    });
    dispatch(setSelectedFilesAction([]));
  };

  const restoreSelected = () => {
    markedFiles?.forEach(async (file) => {
      await undoDelete({
        id: file?.id,
      });
      await refetchUserData({
        requestPolicy: "network-only",
      });
    });
    dispatch(setSelectedFilesAction([]));
  };

  return (
    <div className={styles.files}>
      <LinearProgress variant="determinate" value={progress} />
      <div className={styles.files__header}>
        {folder === "Trash" ? (
          user?.user?.trash?.length ? (
            <>
              <button onClick={emptyTrashHandler}>Empty Trash</button>
              {markedFiles?.length ? (
                <div className={styles.files__header__controls}>
                  <Tooltip title="Select All">
                    <div className={styles.files__header__controls__select}>
                      <p>{markedFiles?.length} selected</p>
                      <Checkbox
                        onChange={(e) => {
                          if (e.target.checked === true) {
                            if (folder === "Trash") {
                              dispatch(
                                setSelectedFilesAction(user?.user?.trash ?? [])
                              );
                            } else {
                              return;
                            }
                          } else {
                            dispatch(setSelectedFilesAction([]));
                          }
                        }}
                        className={styles.files__header__controls__checkbox}
                      />
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete Selected">
                    <IconButton onClick={deleteSelected}>
                      <MdOutlineDelete />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download Selected">
                    <IconButton onClick={downloadSelected}>
                      <AiOutlineDownload />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Restore Selected">
                    <IconButton onClick={restoreSelected}>
                      <FaTrashRestore />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : null}
            </>
          ) : (
            <p>There's nothing in the Trash.</p>
          )
        ) : (
          <>
            <button onClick={() => setOpen(true)}>Upload {folder}</button>
            {markedFiles?.length ? (
              <div className={styles.files__header__controls}>
                <Tooltip title="Select All">
                  <div className={styles.files__header__controls__select}>
                    <p>{markedFiles?.length} selected</p>
                    <Checkbox
                      onChange={(e) => {
                        if (e.target.checked === true) {
                          if (folder === "Pictures") {
                            dispatch(
                              setSelectedFilesAction(user?.user?.pictures ?? [])
                            );
                          } else if (folder === "Videos") {
                            dispatch(
                              setSelectedFilesAction(user?.user?.videos ?? [])
                            );
                          } else if (folder === "Music") {
                            dispatch(
                              setSelectedFilesAction(user?.user?.musics ?? [])
                            );
                          } else if (folder === "Documents") {
                            dispatch(
                              setSelectedFilesAction(
                                user?.user?.documents ?? []
                              )
                            );
                          } else if (folder === "Miscellaneous") {
                            dispatch(
                              setSelectedFilesAction(
                                user?.user?.miscellaneous ?? []
                              )
                            );
                          } else if (folder === "Trash") {
                            dispatch(
                              setSelectedFilesAction(user?.user?.trash ?? [])
                            );
                          } else {
                            return;
                          }
                        } else {
                          dispatch(setSelectedFilesAction([]));
                        }
                      }}
                      className={styles.files__header__controls__checkbox}
                    />
                  </div>
                </Tooltip>

                <Tooltip title="Delete Selected">
                  <IconButton onClick={deleteSelected}>
                    <MdOutlineDelete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Download Selected">
                  <IconButton onClick={downloadSelected}>
                    <AiOutlineDownload />
                  </IconButton>
                </Tooltip>
              </div>
            ) : null}
            {folder === "Pictures" && (
              <p>{user?.user?.pictures?.length ?? 0} items</p>
            )}
            {folder === "Documents" && (
              <p>{user?.user?.documents?.length ?? 0} items</p>
            )}
            {folder === "Music" && (
              <p>{user?.user?.musics?.length ?? 0} items</p>
            )}
            {folder === "Miscellaneous" && (
              <p>{user?.user?.miscellaneous?.length ?? 0} items</p>
            )}
            {folder === "Videos" && (
              <p>{user?.user?.videos?.length ?? 0} items</p>
            )}
            {folder === "Trash" && (
              <p>{user?.user?.trash?.length ?? 0} items</p>
            )}
          </>
        )}
      </div>

      <div className={styles.files__container}>
        {folder === "Pictures" &&
          user?.user?.pictures?.map((picture) => (
            <File
              key={picture.id}
              file={picture}
              refetchUserData={refetchUserData}
            />
          ))}
        {folder === "Documents" &&
          user?.user?.documents?.map((document) => (
            <File
              key={document.id}
              file={document}
              refetchUserData={refetchUserData}
            />
          ))}
        {folder === "Miscellaneous" &&
          user?.user?.miscellaneous?.map((miscellaneous) => (
            <File
              key={miscellaneous.id}
              file={miscellaneous}
              refetchUserData={refetchUserData}
            />
          ))}
        {folder === "Music" &&
          user?.user?.musics?.map((music) => (
            <File
              key={music.id}
              file={music}
              refetchUserData={refetchUserData}
            />
          ))}
        {folder === "Videos" &&
          user?.user?.videos?.map((video) => (
            <File
              key={video.id}
              file={video}
              refetchUserData={refetchUserData}
            />
          ))}
        {folder === "Trash" &&
          user?.user?.trash?.map((trash) => (
            <File
              key={trash.id}
              file={trash}
              refetchUserData={refetchUserData}
            />
          ))}
      </div>
      {open && (
        <Modal>
          <form
            onSubmit={uploadHandler}
            className={styles.files__file__uploader}
          >
            <div
              className={styles.files__file__selector}
              onClick={() => {
                inputRef?.current?.click();
              }}
            >
              {folder === "Pictures" && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  multiple={true}
                  hidden
                  ref={inputRef}
                />
              )}
              {folder === "Documents" && (
                <input
                  type="file"
                  accept="application/*"
                  onChange={handleChange}
                  multiple={true}
                  hidden
                  ref={inputRef}
                />
              )}
              {folder === "Miscellaneous" && (
                <input
                  type="file"
                  onChange={handleChange}
                  multiple={true}
                  hidden
                  ref={inputRef}
                />
              )}
              {folder === "Music" && (
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleChange}
                  multiple={true}
                  hidden
                  ref={inputRef}
                />
              )}
              {folder === "Videos" && (
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleChange}
                  multiple={true}
                  hidden
                  ref={inputRef}
                />
              )}

              {Boolean(files) === false ? (
                <div>Click here to select {folder}.</div>
              ) : (
                <div>{`${
                  files?.length
                } ${folder.toLowerCase()} ready to be uploaded.`}</div>
              )}
            </div>
            <div className={styles.files__buttons}>
              <div>
                <button type="submit" disabled={files === null}>
                  Upload
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFiles(null);
                    setOpen(false);
                  }}
                >
                  close
                </button>
              </div>
              <p>
                {files?.length ?? 0} {folder.toLowerCase()} selected.
              </p>
            </div>
            <LinearProgress variant="determinate" value={progress} />
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Files;
