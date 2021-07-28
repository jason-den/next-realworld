// TODO: add type user
const checkLogin = (currentUser: any) =>
  !!currentUser && currentUser?.constructor === Object && Object.keys(currentUser).length !== 0;

export { checkLogin };
