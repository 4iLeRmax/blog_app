export const getPost = async (id: string): Promise<Post> => {
  return await fetch(`http://localhost:4200/posts/${id}`).then((res) => res.json());
};
