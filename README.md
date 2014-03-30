nodeignore
==========

A simple CLI utility for pulling down the latest .gitignore for Node from GitHub

Installation
------------

Run `npm install -g nodeignore`

That's it

You can also run `npm install -g itsananderson/nodeignore` if you want the latest version from GitHub

Usage
-----

To download the Node .gitignore file into the current directory, just run `nodeignore`

If you want to download the .gitignore file into another directory, run `nodeignore -d <other-directory>`

If a .gitignore file already exists, you have two options

* Run `nodeignore -f` to overwrite the file
* Run `nodeignore -a` to append to the current file