import { dbSession } from "@/server/db";
import { User } from "@/types/user";
import { userSchema } from "@/schemas/user";

//we have a unique constraint on the email property of the user node
//storing the password in plaintext is not secure, but this is just a demo
const QUERY = `
CREATE (u:User {email: $email, password: $password})
SET u.username = $username, u.firstName = $firstName, u.lastName = $lastName, u.institution = $institution, u.researchArea = $researchArea, u.role = $role, u.id = $id
    `;

export async function registerUser(user: User) {
  try {
    const generatedId = user.email.split("@")[0];
    const parsedData = userSchema.parse({ ...user, id: generatedId });

    const result = await dbSession.executeWrite((tx) => tx.run(QUERY, { ...parsedData }));

    console.log(result);
  } catch (e) {
    console.log(e);
    throw new Error("An error occured while registering the user");
  }
}
