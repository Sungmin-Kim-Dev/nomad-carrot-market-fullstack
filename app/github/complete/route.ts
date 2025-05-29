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

  const usernameForDb = await generateUsername(login, id);

  // GitHub ID로 사용자를 찾지 못한 경우, 이메일을 기준으로 사용자를 찾거나 새로 생성합니다.
  // 먼저 사용자가 있는지 조회
  const existingUser = await db.user.findUnique({
    where: { email: githubEmail },
    select: { id: true, username: true, avatar: true },
  });

  let user;

  if (existingUser) {
    // 기존 사용자가 있는 경우
    user = await db.user.update({
      where: { id: existingUser.id },
      data: {
        github_id: id.toString(),
        // 기존 username이 있으면 유지, 없으면 GitHub username 사용
        ...(existingUser.username ? {} : { username: usernameForDb }),
        // 기존 avatar가 있으면 유지, 없으면 GitHub avatar 사용 (avatar_url이 있을 경우에만)
        ...(!existingUser.avatar && avatar_url ? { avatar: avatar_url } : {}),
      },
      select: {
        id: true,
      },
    });
  } else {
    // 새 사용자 생성
    user = await db.user.create({
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
  }

  await logInCookie(user.id);
  return redirect("/profile");
}
