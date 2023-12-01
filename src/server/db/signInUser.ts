import { dbSession } from "@/server/db";
import { User } from "@/types/user";

//we have a unique constraint on the email property of the user node
//storing the password in plaintext is not secure, but this is just a demo
const QUERY = `
MATCH (u:User {username: $username, password: $password})
RETURN u
    `;

export async function signInUser(credentials: Record<"username" | "password", string> | undefined) {
  if (!credentials) {
    throw new Error("No credentials provided");
  }

  try {
    const result = await dbSession.executeWrite((tx) => tx.run(QUERY, { ...credentials }));

    if (!result.records[0] || !result.records[0].get("u")) {
      throw new Error("No user found");
    }

    const user = result.records[0].get("u").properties as User;
    return user;
  } catch (e) {
    console.log(e);
    throw new Error("An error occured while registering the user");
  }
}
