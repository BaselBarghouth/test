import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
const providers = [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
        try {
            
            const response = await fetch(
                "https://plankton-app-pffl2.ondigitalocean.app/api/auth/local",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    identifier: credentials.email,
                    password: credentials.password,
                  }),
                }
              );
            const json = await response.json();
            if (response.ok && json.user) {
                return json.user;
            }
        } catch (error) {
            return null;
        }

    },
  }),
];
export const authOptions = {
  // Configure one or more authentication providers
  providers: [...providers],
  callbacks: {
    jwt({ token, user }) {
      // if (user) { // User is available during sign-in
      //   token.id = user.id
      // }
      return token;
    },
    session({ session, token }) {
      session.user.imageUrl =
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
      session.user.currency = "€";
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
