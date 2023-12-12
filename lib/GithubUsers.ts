export const getGithubUsers = async ():Promise<GithubUser[]> => {
  return await fetch('http://localhost:4200/githubUsers').then((res) => res.json());
};

export const createGithubUser = async (user: GithubUser) => {
  const res = await fetch('http://localhost:4200/githubUsers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  await res.json();
};
