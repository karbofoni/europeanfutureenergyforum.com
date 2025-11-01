# GitHub Repository Setup

## Step 1: Create a New Repository on GitHub

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `transition-nexus-europe` (or your preferred name)
   - **Description**: "European clean energy platform connecting projects, investors, and suppliers"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
3. Click "Create repository"

## Step 2: Push Your Local Repository to GitHub

GitHub will show you commands to push an existing repository. Run these commands in your project directory:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name.

## Example

If your GitHub username is `johndoe` and you named the repo `transition-nexus-europe`:

```bash
git remote add origin https://github.com/johndoe/transition-nexus-europe.git
git push -u origin main
```

## Verify

After pushing, refresh your GitHub repository page. You should see all 110 files uploaded, including:
- Application code (app/, components/, lib/)
- Configuration files (package.json, next.config.js, etc.)
- Documentation (README.md, DEPLOYMENT.md, etc.)
- Supabase migrations

## Important Notes

- Your `.env` file is NOT included in the repository (it's in .gitignore for security)
- You'll configure environment variables separately in Netlify
- The repository is now ready for Netlify deployment

## Next Steps

Once your code is on GitHub, proceed to Netlify deployment (see NETLIFY-SETUP.md)
