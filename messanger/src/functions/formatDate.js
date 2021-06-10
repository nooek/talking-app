const getDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = String(today.getFullYear());
  let hour = String(today.getHours());
  let minute = String(today.getMinutes());
  let seconds = String(today.getSeconds());

  if (hour.length === 1) {
    hour = `0${hour}`;
  }

  if (minute.length === 1) {
    minute = `0${minute}`;
  }

  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }

  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hour}:${minute}:${seconds}`,
  };
};

export default getDate;
