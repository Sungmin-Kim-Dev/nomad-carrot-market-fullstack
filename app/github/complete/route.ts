import db from "@/lib/db";
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
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code: code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userProfileData = await userProfileResponse.json();
  if (!userProfileResponse.ok || !userProfileData?.id) {
    return new Response("Failed to fetch GitHub user profile.", {
      status: 400,
    });
  }

  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userEmailDataArray = await userEmailResponse.json();

  const generateUsername = async (userProfileData: {
    login: string;
    id: number;
  }) => {
    const baseUsername = userProfileData.login;

    const existingUserWithThisUsername = await db.user.findUnique({
      where: {
        username: baseUsername,
      },
      select: {
        id: true,
      },
    });

    return existingUserWithThisUsername
      ? `${userProfileData.login}_gh_${userProfileData.id.toString().slice(0, 5)}`
      : baseUsername;
  };

  if (!userEmailResponse.ok || !Array.isArray(userEmailDataArray)) {
    console.error("Failed to fetch GitHub user emails:", userEmailDataArray);
    return new Response("Failed to fetch GitHub user emails.", {
      status: 400,
    });
  }

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
      github_id: userProfileData.id.toString(),
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

  const usernameForDb = await generateUsername(userProfileData);

  if (existingUserByEmail) {
    const updatePayload: {
      github_id: string;
      username?: string;
      avatar?: string;
    } = {
      github_id: userProfileData.id.toString(),
    };

    if (!existingUserByEmail.username) {
      updatePayload.username = usernameForDb;
    }
    if (!existingUserByEmail.avatar && userProfileData.avatar_url) {
      updatePayload.avatar = userProfileData.avatar_url;
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
      github_id: userProfileData.id.toString(),
      avatar: userProfileData.avatar_url,
    },
    select: {
      id: true,
    },
  });
  await logInCookie(newUser.id);
  return redirect("/profile");
}
