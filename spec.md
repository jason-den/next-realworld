## Project Overview

"Conduit" is a social blogging site (i.e. a Medium.com clone). It uses a custom API for all requests, including authentication. You can view a live demo over at https://demo.realworld.io

[Submission Link]([submission link](https://codebase.show/projects/realworld))

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU\* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR\*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

# Specs

### Using the hosted API

Point your [API requests](../api/) to `https://conduit.productionready.io/api` and you're good to go!

### Unit test(s)

Include _at least_ **one** unit test in your repo to demonstrate how testing works (full testing coverage is _not_ required!)

### Styles/Templates

We created a custom Bootstrap 4 style & templates to ensure all frontends had consistent UI functionality. Our [starter kit](https://github.com/gothinkster/realworld-starter-kit) includes all the [templates & info required to get up and running](https://github.com/gothinkster/realworld-starter-kit/blob/master/FRONTEND_INSTRUCTIONS.md).

### Routing Guidelines

- Home page (URL: /#/ )
  - List of tags
  - List of articles pulled from either Feed, Global, or by Tag
  - Pagination for list of articles
- Sign in/Sign up pages (URL: /#/login, /#/register )
  - Uses JWT (store the token in localStorage)
  - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit articles (URL: /#/editor, /#/editor/article-slug-here )
- Article page (URL: /#/article/article-slug-here )
  - Delete article button (only shown to article's author)
  - Render markdown from server client side
  - Comments section at bottom of page
  - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
  - Show basic user info
  - List of articles populated from author's created articles or author's favorited articles





## Screenshoot for each Pages 

![home](/Users/jasonden/next-realworld/spec.assets/home.png)

![sign-in](/Users/jasonden/next-realworld/spec.assets/sign-in.png)

![sign-up](/Users/jasonden/next-realworld/spec.assets/sign-up.png)

![image-20210718155243550](/Users/jasonden/next-realworld/spec.assets/image-20210718155243550.png)

editor page

![image-20210718155304316](/Users/jasonden/next-realworld/spec.assets/image-20210718155304316.png)

![image-20210718155350288](/Users/jasonden/next-realworld/spec.assets/image-20210718155350288.png)

Profile page

![image-20210718155549065](/Users/jasonden/next-realworld/spec.assets/image-20210718155549065.png)

