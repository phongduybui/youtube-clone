// eslint-disable-next-line import/no-anonymous-default-export
export default (input) => {
  // Check whether the path match with "/watch/:id" or not? 
  let regex = new RegExp("\/watch\/[\s\S]*");
  return regex.test(input);
}