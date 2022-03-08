import React from "react";

import styles from "./File.module.css";
import {
  Checkbox,
  IconButton,
  Popover,
  Popper,
  Snackbar,
} from "@material-ui/core";

import Image from "next/image";
import Preview from "../Preview/Preview";
import CloseIcon from "@material-ui/icons/Close";
import { saveAs } from "file-saver";
import {
  useDeleteDocumentMutation,
  useDeleteFromTrashMutation,
  useDeleteMiscellaneousMutation,
  useDeleteMusicMutation,
  useDeletePictureMutation,
  useDeleteVideoMutation,
  useUndoDeleteFileMutation,
} from "../../src/generated/graphql";
import { OperationContext } from "urql";
import { displayDate, fileDisplaySize } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFiles } from "../../actions";

interface Props {
  file: {
    __typename?: string;
    id: string;
    url: string;
    filename: string;
    createdAt: string;
    size: number;
    updatedAt: string;
    type?: string;
  };
  refetchUserData?: (opts?: Partial<OperationContext>) => void;
}
const File: React.FC<Props> = ({ file, refetchUserData }) => {
  const [open, setOpen] = React.useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const dispatch = useDispatch();
  const markedFiles = useSelector((state: any) => state.selectedFiles);

  const [{ data: deletePictureData }, deletePicture] =
    useDeletePictureMutation();

  const [_, deleteVideo] = useDeleteVideoMutation();
  const [__, deleteDocument] = useDeleteDocumentMutation();
  const [___, deleteMiscellaneous] = useDeleteMiscellaneousMutation();
  const [____, deleteMusic] = useDeleteMusicMutation();
  const [_____, deleteFromTrash] = useDeleteFromTrashMutation();

  const [{}, undoDelete] = useUndoDeleteFileMutation();

  const downloadFile = async () => {
    await saveAs(file?.url, file?.filename);
  };
  const deleteFile = async () => {
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
    await refetchUserData({
      requestPolicy: "network-only",
    });
  };
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpenSnackBar(deletePictureData?.deletePicture);
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [deletePictureData]);

  const deleteFromTrashHandler = async () => {
    await deleteFromTrash({
      id: file?.id,
    });
    await refetchUserData({
      requestPolicy: "network-only",
    });
  };

  const undoDeleteFileHandler = async () => {
    await undoDelete({
      id: file?.id,
    });
    await refetchUserData({
      requestPolicy: "network-only",
    });
  };
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnackBar}
        onClose={() => setOpenSnackBar(false)}
        message={`Deleted ${file?.filename}`}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setOpenSnackBar(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {selectedFile && (
        <Preview
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          refetchUserData={refetchUserData}
        />
      )}
      <div
        className={styles.file}
        onContextMenu={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        {markedFiles?.length ? (
          <div className={styles.file__selected}>
            <Checkbox
              className={styles.file__selected__checkbox}
              checked={Boolean(markedFiles?.find((f) => f.id === file?.id))}
              onChange={(e) => {
                if (e.target.checked === false) {
                  dispatch(
                    setSelectedFiles(
                      markedFiles.filter((f) => f?.id !== file?.id)
                    )
                  );
                } else {
                  dispatch(setSelectedFiles([...markedFiles, file]));
                }
              }}
            />
          </div>
        ) : null}
        {file?.__typename === "Picture" ? (
          <Image
            onClick={() => {
              setOpen(false);
              setSelectedFile(file);
            }}
            width={170}
            height={0.6 * 210}
            src={file.url}
            alt="alt"
          />
        ) : null}
        {file?.__typename === "Music" ? (
          <Image
            width={170}
            height={0.6 * 210}
            onClick={() => {
              setOpen(false);
              setSelectedFile(file);
            }}
            src={"/music.jpg"}
            alt="alt"
          />
        ) : null}
        {file?.__typename === "Document" ? (
          <Image
            width={170}
            height={0.6 * 210}
            onClick={() => {
              setOpen(false);
              setSelectedFile(file);
            }}
            src={"/document.png"}
            alt="alt"
          />
        ) : null}
        {file?.__typename === "Video" ? (
          <video
            onClick={() => {
              setOpen(false);
              setSelectedFile(file);
            }}
            src={file.url}
            autoPlay={false}
          />
        ) : null}
        {file?.__typename === "Miscellaneous" ? (
          <Image
            width={170}
            height={0.6 * 210}
            onClick={() => {
              setOpen(false);
              setSelectedFile(file);
            }}
            src={"/miscellaneous.png"}
            alt="alt"
          />
        ) : null}
        {file?.__typename === "Trash" ? (
          <>
            {file?.type === "Picture" ? (
              <Image
                onClick={() => {
                  setOpen(false);
                }}
                width={170}
                height={0.6 * 210}
                src={file.url}
                alt="alt"
              />
            ) : null}
            {file?.type === "Music" ? (
              <Image
                width={170}
                height={0.6 * 210}
                onClick={() => {
                  setOpen(false);
                }}
                src={"/music.jpg"}
                alt="alt"
              />
            ) : null}
            {file?.type === "Document" ? (
              <Image
                width={170}
                height={0.6 * 210}
                onClick={() => {
                  setOpen(false);
                }}
                src={"/document.png"}
                alt="alt"
              />
            ) : null}
            {file?.type === "Video" ? (
              <video
                onClick={() => {
                  setOpen(false);
                }}
                src={file.url}
                autoPlay={false}
              />
            ) : null}
            {file?.type === "Miscellaneous" ? (
              <Image
                width={170}
                height={0.6 * 210}
                onClick={() => {
                  setOpen(false);
                }}
                src={"/miscellaneous.png"}
                alt="alt"
              />
            ) : null}
          </>
        ) : null}
        <h1
          onClick={() => {
            setOpen(false);
          }}
        >
          {file.filename}
        </h1>
        <div className={styles.file__stats}>
          <p>
            <span>size:</span>
            <span>{fileDisplaySize(file?.size)}</span>
          </p>
          <p>
            <span>created:</span>
            <span>{displayDate(Number(file?.createdAt))}</span>
          </p>
          <p>
            <span>updated:</span>
            <span>{displayDate(Number(file?.updatedAt))}</span>
          </p>
        </div>

        {open &&
          (file?.__typename === "Trash" ? (
            <div className={styles.file__context__menu}>
              {markedFiles?.length === 0 ? (
                <h1
                  onClick={async () => {
                    setOpen(false);
                    await undoDeleteFileHandler();
                  }}
                >
                  Restore file
                </h1>
              ) : (
                <h1
                  onClick={async () => {
                    setOpen(false);
                  }}
                  style={{
                    color: "gray",
                  }}
                >
                  Restore file
                </h1>
              )}
              {markedFiles?.length === 0 ? (
                <h1
                  onClick={async () => {
                    setOpen(false);
                    dispatch(setSelectedFiles([...markedFiles, file]));
                  }}
                >
                  Select
                </h1>
              ) : (
                <h1
                  onClick={async () => {
                    setOpen(false);
                  }}
                  style={{
                    color: "gray",
                  }}
                >
                  Select
                </h1>
              )}
              {markedFiles?.length === 0 ? (
                <h1
                  onClick={async () => {
                    setOpen(false);
                    await deleteFromTrashHandler();
                  }}
                >
                  Delete Forever
                </h1>
              ) : (
                <h1
                  onClick={async () => {
                    setOpen(false);
                  }}
                  style={{
                    color: "gray",
                  }}
                >
                  Delete Forever
                </h1>
              )}
              {markedFiles?.length === 0 ? (
                <h1
                  onClick={() => {
                    setOpen(false);
                    downloadFile();
                  }}
                >
                  Download
                </h1>
              ) : (
                <h1
                  onClick={() => {
                    setOpen(false);
                  }}
                  style={{
                    color: "gray",
                  }}
                >
                  Download
                </h1>
              )}
              <hr />
              <h1 onClick={() => setOpen(false)}>Close</h1>
            </div>
          ) : (
            <div className={styles.file__context__menu}>
              <h1
                onClick={() => {
                  setOpen(false);
                  downloadFile();
                }}
              >
                Download
              </h1>
              <h1
                onClick={async () => {
                  setOpen(false);
                  dispatch(setSelectedFiles([...markedFiles, file]));
                }}
              >
                Select
              </h1>
              <h1
                onClick={async () => {
                  await deleteFile();
                  setOpen(false);
                }}
              >
                Delete
              </h1>

              {file?.__typename !== "Miscellaneous" && (
                <h1
                  onClick={() => {
                    setOpen(false);
                    setSelectedFile(file);
                  }}
                >
                  Preview
                </h1>
              )}

              <hr />
              <h1 onClick={() => setOpen(false)}>Close</h1>
            </div>
          ))}
      </div>
    </>
  );
};

export default File;
