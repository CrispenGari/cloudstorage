import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import {
  useUpdateProfileMutation,
  useUserQuery,
} from "../../../../src/generated/graphql";

import { MdOutlineCancel } from "react-icons/md";
import styles from "./Banner.module.css";
const Banner = () => {
  const inputRef = React.useRef(null);
  const [image, setImage] = React.useState(null);
  const [uploadImage, setUploadImage] = React.useState<any>();
  const [imageLoading, setImageLoading] = React.useState(false);

  const [{ data: userData, fetching: userLoading }, refetchQueries] =
    useUserQuery({
      requestPolicy: "network-only",
    });
  const [{ fetching }, update] = useUpdateProfileMutation();

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted) {
      setImage(userData?.user?.profile?.banner);
    }
    return () => {
      mounted = false;
    };
  }, [userData]);
  const handleChange = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setImageLoading(true);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event: any) => {
      setImage(event.target.result);
      setImageLoading(false);
    };
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadImage({
      valid: e.target.validity.valid,
      image: (e.target as any)?.files[0],
    });
  };
  const saveBanner = async () => {
    await update({
      banner: uploadImage.valid ? uploadImage.image : null,
      size: uploadImage?.image?.size ?? 0,
      input: {},
    });
    await refetchQueries();
  };
  return (
    <div className={styles.banner}>
      {(imageLoading || fetching || userLoading) && (
        <div className={styles.banner__loading}>
          <p>{fetching ? "saving..." : "loading..."}</p>
        </div>
      )}
      <div
        className={styles.banner__cover}
        style={{
          backgroundImage: image ? `url(${image})` : "",
          backgroundColor: image ? "cornflowerblue" : "black",
        }}
      >
        {String(image).startsWith("data:image/") && (
          <IconButton
            title={"cancel"}
            onClick={() => {
              setImage(undefined);
              return;
            }}
            className={styles.banner__cover__cancel__btn}
          >
            <MdOutlineCancel />
          </IconButton>
        )}
        <div className={styles.banner__avatar}>
          <Avatar
            alt={userData?.user?.username}
            src={userData?.user?.profile?.avatar}
            title={userData?.user?.username}
            className={styles.banner__avatar__avatar}
          />
        </div>
        <input
          type="file"
          ref={inputRef}
          hidden
          accept="image/*"
          multiple={false}
          onChange={(e) => {
            handleChange2(e);
            handleChange(e);
          }}
        />
        {String(image).startsWith("data:image/") === false ? (
          <button
            title="change banner"
            onClick={() => inputRef.current?.click()}
          >
            edit
          </button>
        ) : (
          <button title="change banner" onClick={saveBanner}>
            save
          </button>
        )}
      </div>
    </div>
  );
};

export default Banner;
