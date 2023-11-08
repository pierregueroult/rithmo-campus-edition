import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sha256 from "sha256";

export const authOptions: NextAuthOptions = {
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
          name: "labete-admin",
          password:
            "915342d9e170681dba92aa4280fe6d84c0fb682250a9c7da0bb805dcbe5d646e",
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
