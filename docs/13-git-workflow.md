# 🌿 Git Workflow & Best Practices

## Branch Structure

The project follows **Git Flow** branching strategy:

```
main                    # Production branch (stable releases)
├── dev                 # Development branch (integration)
├── feature/*           # Feature development branches
├── bugfix/*            # Bug fix branches
└── hotfix/*            # Emergency hotfix branches
```

---

## 📋 Branch Naming Convention

### Format

```
<type>/<short-description>
```

### Types

| Type | Purpose | Base Branch | Merge To | Example |
|------|---------|-------------|----------|---------|
| `feature/` | New features | `dev` | `dev` | `feature/user-authentication` |
| `bugfix/` | Bug fixes | `dev` | `dev` | `bugfix/navbar-responsive` |
| `hotfix/` | Critical fixes | `main` | `main` + `dev` | `hotfix/payment-error` |
| `refactor/` | Code improvements | `dev` | `dev` | `refactor/header-component` |
| `docs/` | Documentation | `dev` | `dev` | `docs/api-guide` |

### Examples

```bash
# Features
feature/google-oauth
feature/multi-language-support
feature/table-reservation

# Bug Fixes
bugfix/cart-quantity-update
bugfix/responsive-menu
bugfix/login-redirect

# Hotfixes
hotfix/checkout-crash
hotfix/payment-gateway-error

# Refactoring
refactor/api-service-layer
refactor/state-management

# Documentation
docs/git-workflow
docs/api-reference
```

---

## 💬 Commit Message Convention

### Using Conventional Commits

The project enforces **Conventional Commits** with **Husky + Commitlint**.

### Format

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Commit Types

| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add Google OAuth authentication` |
| `fix` | Bug fix | `fix: resolve cart quantity update issue` |
| `docs` | Documentation | `docs: update API integration guide` |
| `style` | Code formatting | `style: format code with Prettier` |
| `refactor` | Code refactoring | `refactor: optimize Header component` |
| `perf` | Performance | `perf: lazy load product images` |
| `test` | Tests | `test: add unit tests for authService` |
| `build` | Build system | `build: update Vite configuration` |
| `ci` | CI/CD | `ci: add GitHub Actions workflow` |
| `chore` | Maintenance | `chore: upgrade dependencies` |
| `revert` | Revert commit | `revert: revert feat: add feature X` |

### Scope (Optional)

Indicates the area of codebase:

```bash
feat(auth): add forgot password flow
fix(cart): resolve quantity increment bug
docs(readme): update installation steps
style(header): improve navigation spacing
refactor(api): restructure service layer
```

### Subject

- Use imperative mood: "add" not "added" or "adds"
- Don't capitalize first letter
- No period at the end
- Maximum 72 characters

### Valid Examples

```bash
# Simple
feat: add user profile page
fix: correct login redirect
docs: update README

# With scope
feat(checkout): add payment method selection
fix(menu): resolve filter not working
style(footer): update social media icons

# With body
feat: implement multi-language support

Added i18next integration with English and Vietnamese.
Created 12 namespace structure for better organization.
Updated all components to use translation hook.

# Breaking change
feat!: migrate to React Router v7

BREAKING CHANGE: Updated routing syntax requires code changes
in all route definitions. See migration guide for details.
```

### Invalid Examples ❌

```bash
❌ "update code"              # Too vague, missing type
❌ "WIP"                      # Not descriptive
❌ "fixed bug"                # Missing type prefix
❌ "Feat: Add feature"        # Capital letter after colon
❌ "feat:add feature"         # Missing space after colon
❌ "feat: Added feature."     # Wrong tense, has period
```

---

## 🔄 Git Workflow Steps

### 1. Start New Feature

```bash
# Ensure dev is up to date
git checkout dev
git pull origin dev

# Create feature branch
git checkout -b feature/your-feature-name

# Verify current branch
git branch
```

### 2. Make Changes

```bash
# Make code changes...

# Check status
git status

# View changes
git diff

# Stage specific files
git add src/components/Header.tsx

# Or stage all changes
git add .

# Commit with proper message
git commit -m "feat(header): add new navigation menu"
```

**Note:** If commit message doesn't follow convention, Commitlint will reject it.

### 3. Push Changes

```bash
# First push (set upstream)
git push -u origin feature/your-feature-name

# Subsequent pushes
git push
```

### 4. Create Pull Request

1. Go to GitHub repository
2. Click "Compare & pull request"
3. **Base:** `dev` (not `main`)
4. **Compare:** your feature branch
5. Fill in PR details:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Documentation update
   - [ ] Refactoring

   ## Changes Made
   - Added X component
   - Updated Y logic
   - Fixed Z bug

   ## Screenshots (if applicable)
   [Add screenshots]

   ## Testing
   - [ ] Tested locally
   - [ ] No console errors
   - [ ] Responsive design checked

   ## Related Issues
   Closes #123
   ```
6. Request reviewers
7. Submit PR

### 5. Code Review

**For Author:**
- Respond to comments promptly
- Make requested changes
- Push updates to same branch
- Re-request review

**For Reviewer:**
- Check code quality and standards
- Test functionality
- Verify no breaking changes
- Leave constructive feedback
- Approve or request changes

### 6. Merge PR

```bash
# After approval, merge via GitHub UI
# Recommended: "Squash and merge"

# Delete remote branch (via GitHub)

# Update local dev
git checkout dev
git pull origin dev

# Delete local feature branch
git branch -d feature/your-feature-name
```

### 7. Keep Branch Updated

If feature branch is long-lived:

```bash
# Option 1: Merge dev into feature (simpler)
git checkout feature/your-feature
git merge dev
git push origin feature/your-feature

# Option 2: Rebase (cleaner history, use with caution)
git checkout feature/your-feature
git rebase dev
git push origin feature/your-feature --force-with-lease
```

---

## 🛠️ Useful Git Commands

### Status & Info

```bash
# Check status
git status

# View commit history
git log --oneline
git log --graph --oneline --all

# View changes
git diff                    # Unstaged changes
git diff --staged          # Staged changes
git diff dev               # Compare with dev branch

# List branches
git branch -a              # All branches
git branch -r              # Remote branches
git branch -vv             # With tracking info
```

### Branch Management

```bash
# Create and switch
git checkout -b feature/new-feature

# Switch branches
git checkout dev
git switch dev             # Modern alternative

# Delete local branch
git branch -d feature/old-feature     # Safe delete
git branch -D feature/old-feature     # Force delete

# Delete remote branch
git push origin --delete feature/old-feature

# Rename current branch
git branch -m new-branch-name
```

### Undoing Changes

```bash
# Discard unstaged changes
git restore file.txt
git checkout -- file.txt   # Old syntax

# Unstage files
git restore --staged file.txt
git reset HEAD file.txt    # Old syntax

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>

# Amend last commit
git commit --amend --no-edit
```

### Stashing

```bash
# Save work in progress
git stash
git stash save "work in progress on feature X"

# List stashes
git stash list

# Apply latest stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove stash
git stash pop

# Clear all stashes
git stash clear
```

### Remote Operations

```bash
# View remotes
git remote -v

# Fetch updates
git fetch origin
git fetch --all

# Pull with rebase
git pull --rebase origin dev

# Push force safely
git push --force-with-lease
```

---

## 🚧 Merge Conflict Resolution

### When Conflicts Occur

```bash
# Check which files have conflicts
git status

# Open conflicted files
# Look for conflict markers:
<<<<<<< HEAD
Your changes
=======
Incoming changes
>>>>>>> branch-name

# Resolve conflicts:
# 1. Choose one version
# 2. Combine both versions
# 3. Write new code

# Stage resolved files
git add resolved-file.tsx

# Complete merge
git commit              # If merging
git rebase --continue   # If rebasing

# Abort if needed
git merge --abort
git rebase --abort
```

### Tips for Avoiding Conflicts

1. Pull dev frequently
2. Keep feature branches short-lived
3. Communicate with team about overlapping work
4. Commit often
5. Use smaller, focused PRs

---

## ✅ Best Practices

### DO ✅

1. **Always branch from `dev`** for new features
2. **Write descriptive commit messages** following conventions
3. **Pull latest changes** before creating new branch
4. **Create Pull Requests** for all changes
5. **Request code reviews** from team
6. **Test thoroughly** before pushing
7. **Resolve conflicts** before requesting review
8. **Delete branches** after merging
9. **Keep commits atomic** (one logical change)
10. **Update documentation** with code changes

### DON'T ❌

1. **Never push directly to `main` or `dev`**
2. **Never force push to shared branches**
3. **Never commit sensitive data** (passwords, API keys)
4. **Never commit node_modules or build folders**
5. **Never use vague messages** ("fix", "update", "WIP")
6. **Never merge your own PRs** without review
7. **Never commit commented code** (delete instead)
8. **Never commit console.logs** in production code
9. **Never work directly on `dev`**
10. **Never rebase public/shared branches**

---

## 🆘 Emergency Procedures

### Accidentally Committed to Wrong Branch

```bash
# If not pushed yet
git reset HEAD~1              # Undo commit, keep changes
git stash                     # Save changes
git checkout correct-branch   # Switch branch
git stash pop                 # Apply changes
git add .
git commit -m "correct message"
```

### Accidentally Pushed Sensitive Data

```bash
# ⚠️ URGENT: Do this immediately

# 1. Remove file from history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

# 2. Force push (coordinate with team)
git push origin --force --all

# 3. Notify team to re-clone
# 4. Rotate exposed credentials ASAP
```

### Recover Deleted Branch

```bash
# Find commit hash
git reflog

# Recreate branch
git checkout -b recovered-branch <commit-hash>
```

### Undo Force Push

```bash
# Find previous commit
git reflog

# Reset to that commit
git reset --hard <commit-hash>

# Force push again
git push --force-with-lease
```

---

## 🎓 Git Aliases (Optional)

Add to `.gitconfig`:

```bash
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
  unstage = reset HEAD --
  last = log -1 HEAD
  lg = log --graph --oneline --all --decorate
  amend = commit --amend --no-edit
```

Usage:
```bash
git st              # git status
git co dev          # git checkout dev
git lg              # pretty log graph
```

---

## 📊 Pull Request Template

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature (feat)
- [ ] Bug fix (fix)
- [ ] Documentation (docs)
- [ ] Code refactoring (refactor)
- [ ] Performance improvement (perf)
- [ ] Tests (test)

## Changes Made
- 
- 

## Screenshots
[If applicable]

## Testing
- [ ] Tested locally
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Responsive design verified
- [ ] All tests passing

## Related Issues
Closes #

## Checklist
- [ ] Code follows project conventions
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No breaking changes
- [ ] Tested on multiple browsers
```

---

**Next:** [Code Quality →](./14-code-quality.md)
