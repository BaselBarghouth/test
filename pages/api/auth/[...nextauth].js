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
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: 'test@test.com',
              password: 'Test321!@',
            }),
          }
        );

        const json = await response.json();
        if (response.ok && json.user) {
          return {
            id: json.user.id,
            email: json.user.email,
            name: json.user.username,
          };
        }
      } catch (error) {
        console.log(error);
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
    async session({ session, token }) {
        const address = await doRequest(`addresses?filters[user][email][$eq]=${session.user.email}`, "GET");
        const user = await doRequest(`users?filters[email][$eq]=${session.user.email}`, "GET");
        session.user.address = address[0].id;
        session.user.id = user[0].id;
        session.user.image =
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

const doRequest = async (url, method, data) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ORDER_TOKEN}`,
    };
    try {
      const options = {
        method,
        headers,
      };
      if (data) {
        options.body = JSON.stringify(data);
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/${url}`,
        options
      );
      // Check if the response is ok (status in the range 200-299)
      if (!res.ok) {
        console.error(`Server responded with status ${res.status}`);
        return null; // Or throw an error or handle as needed
      }
  
      // Check if the response's content type is JSON before parsing
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Received non-JSON response from the server");
        return null; // Or throw an error or handle as needed
      }
  
      const json = await res.json();
      if(!json.data){
        return json;
      }
      return json.data;
    } catch (error) {
      console.error("Error making request:", error);
      return null; // Or throw an error or handle as needed
    }
  };