# Project Bojack

## Getting started

### Clone the repository

Move to the directory where you want the project to be stored.
If you want the projects in `Documents/Project-Bojack`, you would move into `Documents` using `cd`.

Then run:

```
git clone https://gitlab.ecs.csus.edu/horsin-around/project-bojack.git Project-Bojack
```

_Note: The final argument will be the name of the directory you clone into. Feel free to change it._

## Setting up your identity

You will need to make your commits using your ECS email:

```
git config --global user.name "First Last"
git config user.email ecs_username@ecs.csus.edu
```

_Note: The `--global` flag changes your global configuration - presumably you will use the same name
for all projects.
You may want to use different emails for your other projects though. You can set a global default as
well as different local settings for individual repos._

_If you want to view or edit your configuration file by hand, your local configuration is stored in
`.git/config`. Your global configuration is stored in `~/.gitconfig` (`~` is your home directory)._

## Merging

**Please do not commit directly to `master`.**

Create a new branch and switch to it:

```
git checkout -b feature-name
```

`feature-name` should be something like `fix-typo`, `update-readme` or `edit-css`.

Make your commits on that branch. When you're ready to share your changes:

```
git push -u origin feature-name
```

_Note: The remote branch can have a different name than your local one if you want it to._

When you're ready to merge your changes into `master`, make a "merge request" on GitLab.

## Pulling

If you just want to get the latest changes to `master`, all you need is:

```
git pull
```

_Note: This assumes you are on the `master` branch. Use `git checkout master` to switch to it._
