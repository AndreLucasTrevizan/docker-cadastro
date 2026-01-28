import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  pages: {
    signIn: '/auth/sign_in',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email", placeholder: "Digite seu e-mail" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        if (credentials.email == "andre@gmail.com" && credentials.password == "123") {
          return {
            id: "1",
            name: "Andre Lucas",
            email: "andre@gmail.com"
          };
        }

        return null;
      }
    })
  ]
});

export { handler as GET, handler as POST }
