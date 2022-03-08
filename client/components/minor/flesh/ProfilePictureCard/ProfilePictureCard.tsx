import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import {
  UserDocument,
  useUpdateProfileMutation,
  useUserQuery,
} from "../../../../src/generated/graphql";
import styles from "./ProfilePictureCard.module.css";
import { FiCameraOff } from "react-icons/fi";
import { AiFillCamera } from "react-icons/ai";
import { useRouter } from "next/router";

const ProfilePictureCard: React.FC<{
  username?: string;
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ username, setEdit }) => {
  const router = useRouter();
  const [{ data, fetching: loadingUser }, refetchQueries] = useUserQuery({
    requestPolicy: "network-only",
  });
  const [{ data: updateData, fetching }, update] = useUpdateProfileMutation();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [uname, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");

  const [image, setImage] = React.useState<any>(data?.user?.profile?.avatar);
  const [uploadImage, setUploadImage] = React.useState<any>();
  const [imageLoading, setImageLoading] = React.useState(false);
  const inputRef = React.useRef(null);

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

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data?.user) {
      setImage(data?.user?.profile?.avatar);
      setPhoneNumber(data?.user?.profile?.phoneNumber ?? "");
      setEmail(data?.user?.email ?? "");
      setUsername(data?.user?.username ?? "");
    }
    return () => {
      mounted = false;
    };
  }, [data]);

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && updateData?.updateProfile) {
      if (updateData?.updateProfile?.error) {
        setError(updateData?.updateProfile?.error.message);
      } else {
        if (setEdit) {
          setEdit(false);
        } else {
          router.replace("/");
        }
        setError("");
      }
    }
    return () => {
      mounted = false;
    };
  }, [updateData, router, setEdit]);

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadImage({
      valid: e.target.validity.valid,
      image: (e.target as any)?.files[0],
    });
  };
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await update({
      size: uploadImage?.image?.size ?? 0,
      avatar: uploadImage?.valid ? uploadImage?.image : null,
      input: {
        phoneNumber,
        username: uname,
        email,
      },
    });
    await refetchQueries();

    if (username) {
      if (updateData?.updateProfile?.success === true) {
        setEdit(false);
      }
    } else {
      if (updateData?.updateProfile?.success === true) {
        await router.replace("/");
      }
    }
  };

  console.log(data);
  return (
    <form className={styles.profile__picture__card} onSubmit={updateHandler}>
      {(fetching || loadingUser || imageLoading) && (
        <div className={styles.profile__picture__card__loading}>
          {loadingUser || imageLoading ? "loading..." : "saving..."}
        </div>
      )}
      <h1>Hi, {data?.user?.username}</h1>
      <p>
        {`${
          !username
            ? "We have seen that you created an account for the first time. You can update your profile before getting started."
            : "Profile Update."
        }`}
      </p>
      <div className={styles.profile__picture__card__avatar__container}>
        <Avatar
          onClick={() => inputRef.current.click()}
          src={image}
          alt={data?.user?.username}
          className={styles.profile__picture__card__avatar}
        />
        <div className={styles.profile__picture__card__avatar__camera}>
          {!String(image).startsWith("data:image/") ? (
            <IconButton
              title="open pictures"
              onClick={() => inputRef.current?.click()}
            >
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
              <AiFillCamera />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setImage(data?.user?.profile?.avatar);
                setUploadImage(null);
              }}
              title="remove image"
            >
              <FiCameraOff />
            </IconButton>
          )}
        </div>
      </div>

      <div className={styles.profile__picture__card__inputs}>
        <div className={styles.profile__picture__card__inputs__twins}>
          <p>updating username and email.</p>
          <p>
            <input
              value={uname}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
          </p>
        </div>
        <p>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="phone number"
          />
        </p>
      </div>
      <p className={styles.profile__picture__card__error}>{error}</p>
      <div className={styles.profile__picture__card__buttons}>
        <button type="submit">SAVE</button>
        {!username ? (
          <button type="button" onClick={() => router.replace("/")}>
            NOT NOW
          </button>
        ) : (
          <button type="button" onClick={() => setEdit(false)}>
            CLOSE
          </button>
        )}
      </div>
    </form>
  );
};

export default ProfilePictureCard;
