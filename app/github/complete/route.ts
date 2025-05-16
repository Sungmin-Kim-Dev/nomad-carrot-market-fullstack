import db from "@/lib/db";
import {
  getGitHubAccessToken,
  getGithubEmails,
  getGithubProfile,
} from "@/lib/githubAuth";
import { logInCookie } from "@/lib/login";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const { error, access_token } = await getGitHubAccessToken(code);
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { id, login, avatar_url } = await getGithubProfile(access_token);
  const userEmailDataArray = await getGithubEmails(access_token);

  const generateUsername = async (login: string, id: number) => {
    const baseUsername = login;

    const existingUserWithThisUsername = await db.user.findUnique({
      where: {
        username: baseUsername,
      },
      select: {
        id: true,
      },
    });

    return existingUserWithThisUsername
      ? `${login}_gh_${id.toString().slice(0, 5)}`
      : baseUsername;
  };

  let primaryEmailObject = userEmailDataArray.find(
    (emailObj: any) => emailObj.primary && emailObj.verified,
  );
  if (!primaryEmailObject) {
    primaryEmailObject = userEmailDataArray.find(
      (emailObj: any) => emailObj.verified,
    );
  }
  if (!primaryEmailObject && userEmailDataArray.length > 0) {
    primaryEmailObject = userEmailDataArray[0];
  }

  if (!primaryEmailObject || !primaryEmailObject.email) {
    console.error(
      "No suitable or verified email found from GitHub:",
      userEmailDataArray,
    );
    return new Response("No suitable or verified email found from GitHub.", {
      status: 400,
    });
  }
  const githubEmail = primaryEmailObject.email;
  const existingUserByGithubId = await db.user.findUnique({
    where: {
      github_id: id.toString(),
    },
    select: {
      id: true,
    },
  });

  if (existingUserByGithubId) {
    await logInCookie(existingUserByGithubId.id);
    return redirect("/profile");
  }

  const existingUserByEmail = await db.user.findUnique({
    where: {
      email: githubEmail,
    },
    select: {
      id: true,
      github_id: true,
      username: true,
      avatar: true,
    },
  });

  const usernameForDb = await generateUsername(login, id);

  if (existingUserByEmail) {
    const updatePayload: {
      github_id: string;
      username?: string;
      avatar?: string;
    } = {
      github_id: id.toString(),
    };

    if (!existingUserByEmail.username) {
      updatePayload.username = usernameForDb;
    }
    if (!existingUserByEmail.avatar && avatar_url) {
      updatePayload.avatar = avatar_url;
    }

    await db.user.update({
      where: { id: existingUserByEmail.id },
      data: updatePayload,
    });
    await logInCookie(existingUserByEmail.id);
    return redirect("/profile");
  }

  const newUser = await db.user.create({
    data: {
      username: usernameForDb,
      email: githubEmail,
      github_id: id.toString(),
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  await logInCookie(newUser.id);
  return redirect("/profile");
}
