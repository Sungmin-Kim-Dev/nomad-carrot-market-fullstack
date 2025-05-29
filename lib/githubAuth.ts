interface GitHubTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
  scope?: string;
  token_type?: string;
}

interface GithubUserData {
  id: number;
  login: string;
  avatar_url: string;
}

interface GithubEmailData {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export async function getGitHubAccessToken(
  code: string,
): Promise<GitHubTokenResponse> {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code: code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const response = await fetch(accessTokenURL, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  return response.json();
}

export async function getGithubProfile(access_token: string | undefined) {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userProfileData: GithubUserData = await userProfileResponse.json();

  return userProfileData;
}

export async function getGithubEmails(access_token: string | undefined) {
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const userEmailDataArray: GithubEmailData[] = await userEmailResponse.json();
  return userEmailDataArray;
}
