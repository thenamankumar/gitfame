const compare = (str1, str2) => {
  if (!str1 || !str2) {
    return true;
  }
  return str1.toLowerCase() === str2.toLowerCase();
};

export default compare;
