export const getUsers = async (): Promise<User[]> => {
  return await fetch('http://localhost:4200/users').then((res) => res.json());
};
