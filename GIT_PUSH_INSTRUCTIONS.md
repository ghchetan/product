# Git Push Instructions

## Issue

GitHub no longer supports password authentication for HTTPS Git operations (changed in August 2021). You need to use a Personal Access Token (PAT) instead.

## Solution: Create a Personal Access Token

### Steps:

1. **Go to GitHub Tokens Page**

   - Visit: https://github.com/settings/tokens
   - Or: GitHub → Your Profile → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**

   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name: "Product Repo Access"
   - Set expiration: 90 days or No expiration
   - Select scopes: Check **`repo`** (Full control of private repositories)

3. **Generate and Copy Token**

   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

4. **Use Token to Push**
   ```bash
   git push
   ```
   - When prompted for username: `ghchetan`
   - When prompted for password: **paste your PAT** (not your actual password)

## Alternative: Set Up Credential Manager

To avoid entering credentials every time:

### Windows:

```bash
git config --global credential.helper wincred
```

Then the first time you push, Windows Credential Manager will store the PAT.

### Or use SSH (Recommended):

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "chetan.kumar@greenheck.com"

# Add SSH key to GitHub
# Copy public key:
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: Settings → SSH and GPG keys → New SSH key

# Update remote URL to use SSH:
git remote set-url origin git@github.com:ghchetan/product.git
```

## Current Status

- Email configured: chetan.kumar@greenheck.com
- Remote: https://github.com/ghchetan/product.git
- Branch: main (1 commit ahead of origin)
- Working tree: clean
