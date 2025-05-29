import getSession from "./session";

export async function logInCookie(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
}
