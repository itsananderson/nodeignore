nodeignore
==========

An npm package for downloading .gitignore files from GitHub

Installation
------------

Run `npm install -g nodeignore`

That's it

You can also run `npm install -g itsananderson/nodeignore` if you want the latest version from GitHub

Usage
-----

To download the Node .gitignore file into the current directory with default settings, just run `nodeignore`

### Custom Directory

If you want to download the .gitignore file into another directory, run `nodeignore -d <other-directory>`

### Custom Output File

If you want to use some file name other than `.gitignore`, run `nodeignore -n <other-name>`

### Custom Language

By default, `nodeignore` will download a `Node` specific `.gitignore` from GitHub.
You can download a different language/platform by running `nodeignore -l <other-language>`
Visit GitHub's [gitignore](https://github.com/github/gitignore/) project for a list of available languages.

### Global Gitignore

If you want to download a .gitignore from GitHub's "Global" collection, use the `-g` flag.
This is best when paired with custom `-l` (--language) and `-d` (--dir) parameters.

Example:

```bash
# Download and append vim's .gitignore into home directory
nodeignore --append --global --language vim --dir ~/

# Download and replace the OSX .gitignore into .gitignore_global in the home directory
nodeignore --force --global --language OSX --dir ~/ --name .gitignore_global
```

**Note**: Git needs to be configured with a path to the global gitignore. Run the following command to see if it's already configured:

```bash
git config --global core.excludesfile
```

If it's not configured, you can configure it with this command:

```bash
git config --global core.excludesfile ~/.gitignore
```

### Existing .gitignore

If a .gitignore file already exists, you have two options

* Run `nodeignore -f` to overwrite the file
* Run `nodeignore -a` to append to the current file
