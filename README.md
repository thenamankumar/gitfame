# gitfame

A prograssive web app build with polymerJS to analyze all time Github contributions. Deployed at https://gitfa.me


## How it works

- **Stars:** total number of stars on the repos initiated by the user.
- **Forks:** total number of forks of the repos initiated by the user.
- **Commits:** The number of commits are calculated as per the following rules:
    - If the repo is not a fork, all the commits of that repo, committed by the user, are considered.
    - If the repo is a fork, the commits done by the user on the parent repo are considered.
    - Commits of a repo are considered unless the repo is inactive from last 1 year.


![screen shot 2017-10-24 at 7 52 09 pm](https://user-images.githubusercontent.com/22571395/31951099-cd8bf97e-b8fa-11e7-923f-2cfb7d73aa55.png)

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your application locally.

## Viewing Your Application

```
$ polymer serve
```

## Building Your Application

```
$ polymer build
```

This will create builds of your application in the `build/` directory, optimized to be served in production. You can then serve the built versions by giving `polymer serve` a folder to serve from:

```
$ polymer serve build/bundled
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
