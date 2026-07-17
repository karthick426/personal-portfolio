import https from 'https';

/**
 * Fetches all public repositories for a given GitHub user.
 * Supports token authentication if available.
 * 
 * @param {string} username - GitHub username.
 * @param {string} [token] - Optional GitHub Personal Access Token.
 * @returns {Promise<Array>} List of repositories.
 */
export function fetchUserRepos(username, token) {
  const makeRequest = (useToken) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'api.github.com',
        path: `/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
        method: 'GET',
        headers: {
          'User-Agent': 'Node.js-Portfolio-GitHub-Sync-Api'
        }
      };

      if (useToken && token) {
        options.headers['Authorization'] = `Bearer ${token}`;
      }

      const req = https.get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            if (res.statusCode !== 200) {
              const err = new Error(`GitHub API returned status ${res.statusCode}`);
              err.statusCode = res.statusCode;
              err.headers = res.headers;
              return reject(err);
            }
            const repos = JSON.parse(data);
            resolve(repos);
          } catch (parseErr) {
            reject(parseErr);
          }
        });
      });

      req.on('error', (err) => {
        reject(err);
      });
    });
  };

  if (token) {
    return makeRequest(true).catch((err) => {
      if (err.statusCode === 401) {
        console.warn('⚠️ GitHub token returned 401 Unauthorized. Retrying with unauthenticated request...');
        return makeRequest(false);
      }
      throw err;
    });
  }

  return makeRequest(false);
}
