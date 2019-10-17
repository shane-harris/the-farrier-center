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

_Note: The `--global` flag changes your global configuration - presumably you will use the same name for all projects.
You may want to use different emails for your other projects though. You can set a global default as well as different local
settings for individual repos._

_If you want to view or edit your configuration file by hand, your local configuration is stored in `.git/config`.
Your global configuration is stored in `~/.gitconfig` (`~` is your home directory)._