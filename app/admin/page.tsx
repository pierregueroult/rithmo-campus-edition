import Layout from "@/components/Layout/Layout";
import prisma from "@/prisma/prisma";

async function getAllMusics() {
  return prisma.music.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function Admin(): Promise<JSX.Element> {
  const musics = await getAllMusics();
  return (
    <Layout>
      <h1>Admin</h1>
      <p>Gérez les musiques votées ici</p>
      <ul>
        {musics.map((music) => (
          <li key={music.id}>
            {music.title} - {music.artist}
          </li>
        ))}
      </ul>
    </Layout>
  );
}
