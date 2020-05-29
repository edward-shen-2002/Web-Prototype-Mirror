

const groupRegex = /^\[[1-9]*\] [0-9]*$/;
export const isGroupString = (string) => groupRegex.test(string);
export const getGroupData = (groupString) => {
  const [ layerData, groupId ] = groupString.split(" ");

  const layer = +layerData.substring(1, layerData.length - 1);

  return { layer, groupId: +groupId };
};