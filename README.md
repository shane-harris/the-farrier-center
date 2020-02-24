# Project Bojack

Project Bojack is an online application with intention of being used to track the condition of and
work done on horses by employees of `The Ferrier Center`.

## Installing Dependencies

Our project depends on several node packages, which are specified in `package.json`. To install all
dependencies, run `npm install` (or `npm i` for short).

Any time you pull code from GitLab, you should run `npm install` again if any new packages have been
added to `package.json`. All packages will be "installed" in `node_modules`, so if you think there's
something wrong with an installed package, you can simply delete that folder and run `npm install`
again. (Some versions of `npm` support the `npm clean-install` command, which will do this for you).

## MongoDB Setup

To Interface with the database first you must create an account on the cluster, to do this

1. Go to https://cloud.mongodb.com and login.
2. Click on the cluster.
3. Under the Security header click on `Database Access`.
4. Click on `ADD NEW USER`.
5. Create your account for the database, You should only need the read and write permissions.

**It is recommended not to use special characters.**

![Important Locations for cluster access](public/images/ClusterAccess.png)

To get your IDE to connect properly with the cluster you must either find or make a `.env` file in
the root directory of the project and then configure the following two _environment variables_:

```
MONGO_USER='username'
MONGO_PASS='password'
```

Change `'username'` and `'password'` to your actual MongoDB username and password.

## Configure Port

In `.env`, you can specify the desired port number, e.g.:

```
PORT=80
```

## Set up NodeMailer credentials and Jsonwebtokens

In `.env`, add the following lines

```
GMAIL_USER='farrierdev@gmail.com'
GMAIL_PASS='farierdevsacstate'
JWT_KEY='bb8710e8f071a10891b1e256a69c0e4c5fbd7c8724e7202703093f6327b4ff625461e516e6a8dcd35c1d60309a4b3c56b4f2a322a1b049255dca82d331b30d41'
```

## Disable database tests

Testing the database takes pretty long, and slows down the testing suite. Since those tests will
probably never fail anyway, you can skip them by adding

```
TEST_DB='false'
```

to your `.env` file.

## Set up new routes and revisions

Routes have beed extracted to a new folder, routes, and new files index.js, horse.js, user.js index.js and updated to work with this new structure

Routes now fit under a general route prefix. The current files are below.

```
/
/user
/horse
/admin
```

For example all routes related to horse go in the horse.js file under routes. Some have been updated.

```
/horse
/horse/all
/horse/:id
/horse/new
```

For routes like register, login and logout they reside in the index.js file.

```
/login
/logout
/register
```

Admin related routes are in admin.js some have been updated.

```
/admin
/admin/register
```

Add new routes to the appropriate file in the routes folder. The prefix is automatically added by index.js in the root folder.

A /horse/:id/delete route would be added in a route method as

```
router.post("/:id/delete", ...
```

NOT as

```
router.post("/horse/:id/delete"...
```

When refering to a route in a redirect or html form action use the whole route name including the prefix.

For example a redirect to /horse/:id/ no matter from which file it is called even inside horse.js router file uses this exact spelling

```
/horse/:id/
```

NOT

```
/:id/
```
