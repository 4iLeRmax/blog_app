export const getUser = async (id: string): Promise<User> =>
  await fetch(`http://localhost:4200/users/${id}`).then((res) => res.json());
