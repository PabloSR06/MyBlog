

Recently, I have encountered issues with my blog which was created with Blazor and after a lot of thinking I have decided that the best course of action is to migrate this application to React this way I can use all the benefits of React, but I also have at my disposal more hosting sites, since some of these do not allow to upload custom pages and are limited by their predefined integrations.


Following this change, I am also going to change the hosting since I was using Github, before I make this change I want to see how my page would look hosted on Github Pages, let's remember what GitHub Pages is, this is a service offered by GitHub that allows you to host static websites directly from a GitHub repository. It is an excellent option for those who want to publish simple web pages without having to set up a separate web server.




Let’s start, we are going to assume that we already have a repository created, although we can also rename the one we have to `<user>.github.io`.  We'll also assume that we already have our React application, we have to take into account that one of the limitations of GitHub Pages is that you can only host static pages, this means we can't use server-side code or other dynamic content.




We can approach this in different ways, one of the most popular options is using a project called [react-gh-pages](https://github.com/gitname/react-gh-pages). We are going to use Github Workflows this will allow us to be more flexible and not have to edit the code of our application to publish it.

A workflow is a configurable automated process that will run one or more jobs. Workflows are defined by a YAML file checked in to your repository and will run when triggered by an event in your repository, or they can be triggered manually, or at a defined schedule. You can read more about [Github Workflow here](https://docs.github.com/en/actions/using-workflows/about-workflows).


## Requirements

Before we start we need:

- A repository with the React project
- Github token with access to repository


<br>

## How to generate Github token




You can read more about tokens in [this documetation](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
But basically to generate a token you have to go to your profile settings, in the options on the left bottom you will find the developer options, inside you can create a token, set the name and expiration, as for the scope you only need access to the repositories, remember not to share the token with anyone.



![Personal token](/data/posts/img/workflowReactGithubPages/image1.png)



Returning to our repository, we must store the newly generated token as a repository secret. This step is crucial as it enables the token to be available for use in our workflows without exposing sensitive information. By saving the token as a secret, we can safely reference it in our continuous integration and deployment processes, maintaining security in our tasks.


![Actions secrets](/data/posts/img/workflowReactGithubPages/image2.png)



<br>

## Workflow



With the preparations complete, we can create the workflow. Detailed explanations are provided in the comments. These workflows are written in YAML.

We will create two tasks. The first task will handle downloading the necessary dependencies and generating the required files for the project. The second task will take these newly created files and publish them to the `gh-pages` branch.

```yml
name: Deploy # Name of the workflow

# Run workflow on every push to the master branch
on:
  push:
    branches:
      - main

jobs:
  build:
    name: Build # Name of the task
    runs-on: ubuntu-latest 

    steps:
      - name: Checkout repo
        uses: actions/checkout@v2 # Checkout the working branch

      - name: Setup Node
        uses: actions/setup-node@v1 # Version and name of a custom action
        with:
          node-version: 20 # Version of node
      - run: npm ci # Virtualy the same as npm install
      - run: npm run build # Build the proyect

      - name: Upload build files
        uses: actions/upload-artifact@v2 # Upload the result of the build 
        with:
          name: build-files
          path: ./dist
  
  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' # Will only deploy if is in the main branch 
  
    steps:
      - name: Download artifact
        uses: actions/download-artifact@v2 # Download the result of the build 
        with:
          name: build-files
          path: ./dist
  
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.TOKEN }}
          publish_dir: ./dist

```



Let's explain what the jobs inside this workflow, the first job is in charge of making the build of the project, first we checkout the configured branches, once we have the last changes we configure the work environment, in this case we are going to use node in its version 20, and we execute the necessary commands as if it were local, with the only difference that we replace `npm install` by `npm ci` this command are similar, except it's meant to be used in automated environments, finally we save the output of the build command. Then the second task will take these files that we have saved and with the help of our access token it will publish them in the `gh-pages` branch.



<br>

## Github Pages Configuration


The combination of the two tasks created above will have published in a brand other than main/master, so we need to tell the page where are these files so it can be accessible with the URL. In the configuration of our repository we go to the Pages section and where the branches are we must make sure that the branch `gh-page` is set, since it is here where our workflow will put the files of the build of our project.

<br>

![Page settings](/data/posts/img/workflowReactGithubPages/image3.png)

![Final result](/data/posts/img/workflowReactGithubPages/image4.png)

<br>

In conclusion, using the power and flexibility that GitHub gives us, not only we can generate a functional build of our project every time we publish to our main branch, or in the configured branches, but also allows us to have a perfect free page for our projects, just one last thing remember that if you need more of what Github Pages brings, you can replace the deploy task and configure another to be published elsewhere, such as Azure. With this done, you just have to enjoy :).
