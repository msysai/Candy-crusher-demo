# GitHub Setup Guide for Candy Crusher

## Option 1: Using GitHub Website (Recommended)

### Step 1: Create Repository on GitHub
1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon in top right → "New repository"
3. Name it: `candy-crusher`
4. Description: `A delightful match-3 puzzle game built with pure HTML, CSS, and vanilla JavaScript`
5. Choose: Public (or Private)
6. Check: "Add a README file"
7. Click "Create repository"

### Step 2: Push Your Local Code

Open terminal/command prompt in your project folder and run:

```bash
# Add the remote repository (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/candy-crusher.git

# Rename the existing README to avoid conflict
git mv README.md README.md.backup

# Pull the remote README
git pull origin main --allow-unrelated-histories

# Merge the READMEs (optional)
# cat README.md.backup >> README.md
# rm README.md.backup

# Push your code
git push -u origin main
```

## Option 2: Using GitHub CLI (If Available)

If you install GitHub CLI (`gh`), you can do:

```bash
# Login to GitHub
gh auth login

# Create repository
gh repo create candy-crusher --public --description "A delightful match-3 puzzle game built with pure HTML, CSS, and vanilla JavaScript"

# Push code
git push -u origin main
```

## Option 3: Manual Setup with Git Commands

```bash
# Create repository on GitHub first (via website)
# Then run these commands:

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/candy-crusher.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Repository Structure

After setup, your repository should look like:

```
candy-crusher/
├── index.html          # Main game file
├── style.css           # Styling
├── src/
│   └── game.js        # Game logic
├── README.md          # Project description
├── .gitignore         # Git ignore rules
├── LICENSE            # MIT License
└── SETUP_GUIDE.md     # This file
```

## Verification

After pushing, verify:
1. All files appear on GitHub
2. README renders correctly with badges
3. Repository is public (if intended)
4. GitHub Pages can be enabled for live demo

## Next Steps

- Enable GitHub Pages for live demo
- Add topics: `match-3`, `puzzle-game`, `html5-game`, `vanilla-js`
- Create releases for version tracking
- Add issue templates for bug reports