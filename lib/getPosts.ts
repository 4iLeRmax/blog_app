export const getPosts = async (): Promise<Post[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch('http://localhost:4200/posts');

  return res.json();
};