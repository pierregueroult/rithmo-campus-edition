import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sha256 from "sha256";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "Nom d'utilisateur:",
          type: "text",
          placeholder: "labete-admin",
        },
        password: { label: "Mot de passe: ", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        const user = {
          id: 1,
          name: process.env.ADMIN_USERNAME!,
          password: sha256(process.env.ADMIN_PASSWORD!),
        };
        if (
          credentials?.username === user.name &&
          sha256(credentials?.password) === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
