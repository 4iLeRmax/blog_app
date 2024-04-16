import prisma from './prisma';

export const getFavoritePosts = async (userId: string) => {
  const favorites = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      favorites: true,
    },
  });
  // console.log(favorites?.favorites);

  const favoritePosts = await prisma.posts.findMany({
    where: {
      id: {
        in: [...(favorites?.favorites as string[])],
      },
    },
    include: {
      Likes: true,
      Comments: {
        include: {
          Replies: true,
        },
      },
    },
  });
  // console.log(favoritePosts);

  if (favorites?.favorites.length !== favoritePosts.length) {
    const updatedFavorites = favorites?.favorites.filter((el) =>
      favoritePosts.some((post) => post.id === el),
    );

    await prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        favorites: updatedFavorites,
      },
    });
  }
  return favoritePosts;
};
