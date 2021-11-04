import { Request, Response } from 'express';

class GithubAuthController {
  handle(request: Request, response: Response) {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}`);
  }
}

export { GithubAuthController }