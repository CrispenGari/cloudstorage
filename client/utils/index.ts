export const timeStampToDate = (unix_timestamp: number): string => {
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  const formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};

// 1024*1024*1024*5
export const bytesToKB = (bytes: number) => bytes / 1024;
export const kbToMb = (kb: number) => kb / 1024;
export const mbToGb = (mb: number) => mb / 1024;

export const fileDisplaySize = (bytes: number): string => {
  const kb = bytesToKB(bytes);
  if (kb < 500) {
    return kb.toFixed(2).toString() + " kb";
  } else {
    const mb = kbToMb(kb);
    if (mb < 1024) {
      return mb.toFixed(2).toString() + " mb";
    } else {
      return mbToGb(mb).toFixed(2).toString() + " gb";
    }
  }
};

export const displayDate = (unix: number): string => {
  const date = new Date(unix);
  const m =
    date.getMonth().toString().length === 1
      ? "0" + date.getMonth()
      : date.getMonth();
  const d =
    date.getDate().toString().length == 1
      ? "0" + date.getDate().toString()
      : date.getDate().toString();

  const y = date.getFullYear().toString();
  // 05/10/1999 at 03:33

  const h =
    date.getHours().toString().length === 1
      ? "0" + date.getHours().toString()
      : date.getHours().toString();
  const min =
    date.getMinutes().toString().length === 1
      ? "0" + date.getMinutes().toString()
      : date.getMinutes().toString();

  return `${d}/${m}/${y} at ${h}:${min}`;
};
