import React from "react";
import styles from "./Preview.module.css";
import { saveAs } from "file-saver";
import {
  useDeletePictureMutation,
  useDeleteVideoMutation,
  useDeleteDocumentMutation,
  useDeleteMiscellaneousMutation,
  useDeleteMusicMutation,
} from "../../src/generated/graphql";
import { OperationContext } from "urql";
import Image from "next/image";
interface Props {
  setSelectedFile: any;
  selectedFile: any;
  refetchUserData?: (opts?: Partial<OperationContext>) => void;
}

const Preview: React.FC<Props> = ({
  setSelectedFile,
  selectedFile,
  refetchUserData,
}) => {
  const downloadFile = async () => {
    await saveAs(selectedFile?.url, selectedFile?.filename);
  };

  const [{ data: deletePictureData }, deletePicture] =
    useDeletePictureMutation();

  const [_, deleteVideo] = useDeleteVideoMutation();
  const [__, deleteDocument] = useDeleteDocumentMutation();
  const [___, deleteMiscellaneous] = useDeleteMiscellaneousMutation();
  const [____, deleteMusic] = useDeleteMusicMutation();

  const deleteFile = async () => {
    if (selectedFile?.__typename === "Music") {
      await deleteMusic({
        id: selectedFile?.id,
        type: selectedFile?.__typename,
      });
    }
    if (selectedFile?.__typename === "Document") {
      await deleteDocument({
        id: selectedFile?.id,
        type: selectedFile?.__typename,
      });
    }
    if (selectedFile?.__typename === "Video") {
      await deleteVideo({
        id: selectedFile?.id,
        type: selectedFile?.__typename,
      });
    }
    if (selectedFile?.__typename === "Picture") {
      await deletePicture({
        id: selectedFile?.id,
        type: selectedFile?.__typename,
      });
    }
    if (selectedFile?.__typename === "Miscellaneous") {
      await deleteMiscellaneous({
        id: selectedFile?.id,
        type: selectedFile?.__typename,
      });
    }
    await refetchUserData({
      requestPolicy: "network-only",
    });
  };
  return (
    <div className={styles.preview}>
      <div className={styles.preview__main}>
        <div className={styles.preview__header}>
          <div className={styles.preview__header__right}>
            <h1>{selectedFile?.filename}</h1>
            <p>{selectedFile?.createdAt}</p>
          </div>
          <button onClick={() => setSelectedFile(null)}>CLOSE</button>
        </div>
        <div className={styles.preview__main__center}>
          {selectedFile?.__typename === "Picture" && (
            <Image
              width={400}
              height={400}
              src={selectedFile?.url}
              alt={"preview"}
            />
          )}
          {selectedFile?.__typename === "Music" && (
            <>
              <audio
                loop={false}
                src={selectedFile?.url}
                controls
                autoPlay
              ></audio>
              <p>{selectedFile?.filename}</p>
            </>
          )}
          {selectedFile?.__typename === "Video" && (
            <>
              <video
                src={selectedFile?.url}
                autoPlay
                controls
                loop={false}
              ></video>
            </>
          )}
          {selectedFile?.__typename === "Document" && (
            <>
              <iframe src={selectedFile?.url} frameBorder="0"></iframe>
            </>
          )}
        </div>

        <div className={styles.preview__footer}>
          <button onClick={downloadFile}>DOWNLOAD</button>
          <button onClick={deleteFile}>DELETE</button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
