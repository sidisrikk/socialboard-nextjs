const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { faker } = require("@faker-js/faker");

async function main(): Promise<void> {
  // Create users
  const admin = await prisma.user.create({
    data: { username: "admin" },
  });

  const john = await prisma.user.create({
    data: { username: "john" },
  });

  const somchai = await prisma.user.create({
    data: { username: "somchai" },
  });

  const udom = await prisma.user.create({
    data: { username: "udom" },
  });

  // Get all users
  const users = await prisma.user.findMany();

  /**
   * Function to create posts and random comments from different users
   * @param {number} authorId - The ID of the author
   * @param {string} postTitle - The title of the post
   */
  const createPostWithComments = async (
    authorId: number,
    postTitle: string
  ): Promise<void> => {
    const post = await prisma.post.create({
      data: {
        title: postTitle,
        content: faker.lorem.paragraph(),
        authorId,
        createdAt: faker.date.past(),
      },
    });

    const numberOfComments = Math.floor(Math.random() * 5); // 0 to 4 comments
    const commenters = faker.helpers.shuffle(users).slice(0, numberOfComments); // Select random users for commenting

    for (const commenter of commenters) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          postId: post.id,
          authorId: commenter.id,
        },
      });
    }
  };

  // Create posts for John
  await createPostWithComments(john.id, "John's First Post");
  await createPostWithComments(john.id, "John's Second Post");
  await createPostWithComments(john.id, "John's Third Post");

  // Create a post for Somchai
  await createPostWithComments(somchai.id, "Somchai's First Post");
  await createPostWithComments(somchai.id, "Somchai's Second Post");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
