const getMessageHeightOffset = (heightOfMessageBox: number, windowHeight: number) => {
  const maxHeightOfMessageBox = windowHeight * 0.18;
  if (heightOfMessageBox > maxHeightOfMessageBox) {
    return maxHeightOfMessageBox - windowHeight * 0.05;
  }
  if (heightOfMessageBox > 24) {
    return heightOfMessageBox - windowHeight * 0.035;
  }
  return 0;
};

export default getMessageHeightOffset;
