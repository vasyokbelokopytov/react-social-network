export const getStringDate = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const minutes = addZeros(date.getMinutes());
  const dayTime = date.getHours() < 12 ? 'AM' : 'PM';
  const hours = addZeros(
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  );

  function addZeros(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  return `${hours}:${minutes} ${dayTime}`;
};
