import axios from 'axios';
import primaClient from '../prisma';
import { sign } from 'jsonwebtoken';

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string;
  login: string;
  id: number;
  name: string;
}

class AuthUserService {
  async execute(code: string) {
      const url = "https://github.com/login/oauth/access_token";
      const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
        headers: {
          "Accept": "application/json",
        },
        params: {
          client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
          client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET_KEY,
          code,
        },
      });

    const { data: userResponse  } = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`,
      },
    });

    const { login, id, avatar_url,  name } = userResponse;
    let user = await primaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await primaClient.user.create({
        data: {
          github_id: id,
          avatar_url: avatar_url,
          login: login,
          name: name,
        }
      })
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      },
    );

    return { token, user };
  }
}

export { AuthUserService }