# Project Bojack

## Installin Dependencies

Our project depends on several node packages, which are specified in `package.json`. To install all
dependencies, run `npm install` (or `npm i` for short).

Any time you pull code from GitLab, you should run `npm install` again if any new packages have been
added to `package.json`. All packages will be "installed" in `node_modules`, so if you think there's
something wrong with an installed package, you can simply delete that folder and run `npm install`
again. (Some versions of `npm` support the `npm clean-install` command, which will do this for you).

## MongoDB Setup

To configure your username and password for MongoDB, create a file called `.env` in the root
directory of the project.

In that file, specify the following two _environment variables_:

```
MONGO_USER='username'
MONGO_PASS='password'

```

Change `'username'` and `'password'` to your actual MongoDB username and password.
