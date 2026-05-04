# LearningPoint

LearningPoint is a static teaching and learning platform for GCSE Computer Science and BTEC IT.

The site is built for one teacher and their students. Stage 1 is a plain GitHub Pages front end using HTML, CSS and JavaScript only. Supabase will be connected later for authentication, roles, published item metadata, quiz responses and scores.

## Live Site

Student-facing GitHub Pages address:

```text
https://lbyearwood.github.io/learningpoint/
```

Repository:

```text
lbyearwood/learningpoint
```

## Technical Rules

Use only:

- HTML
- CSS
- JavaScript
- Local images and SVG files
- Arial or system fonts

Do not use:

- React, Next.js, Vite or Node.js build tooling
- Tailwind or package managers
- Server-side code
- External CDN libraries
- External font imports
- External image URLs

## Current Focus

GCSE Computer Science:

```text
GCSE Computer Science > Paper 2: Computational Thinking, Algorithms and Programming > 6. Data Representation > Characters, Images and Sound
```

BTEC IT:

```text
BTEC IT > Unit 21: Business Process Modelling Tools > Learning Aim A
```

## Project Structure

```text
index.html
login.html

student/
  dashboard.html

admin/
  control-panel.html

workbooks/
  btec/
    unit-21/
      learning-aim-a.html
  gcse/
    unit-5/
      characters.html
  gcse-cs/
    cpu.html

quizzes/
  btec/
    unit-21/
      learning-aim-a-quiz-1.html
  gcse/
    unit-5/
      characters-quiz-1.html
  gcse-cs/
    cpu-quiz-1.html

assets/
  css/
    styles.css
  images/
    btec/
      unit-21/
    gcse/
      unit-5/
  js/
    config/
    services/
    controllers/
    views/
    utils/
```

## Architecture

The project uses a simple MVC-like static structure.

Services under `assets/js/services/` hold mock data and future Supabase access points.

Views under `assets/js/views/` render repeated UI such as dashboard cards, admin rows, quiz feedback and response tables.

Controllers under `assets/js/controllers/` manage page behaviour such as mobile navigation, login validation, answer reveals, dashboard rendering, teacher course navigation and local quiz marking.

## Content Model

Workbook content is static HTML. Teaching content should live directly in workbook pages such as:

```text
workbooks/gcse/unit-5/characters.html
workbooks/btec/unit-21/learning-aim-a.html
```

Supabase should later store metadata only, such as title, course, unit, learning aim, subtopic, page URL and published status.

Because GitHub Pages serves public static files, published/unpublished status will only control whether links appear in the student dashboard. It will not provide file-level privacy.

## Stage 1 Status

Current Stage 1 pages include:

- Home page
- Login page with local validation
- Student dashboard grouped by GCSE Computer Science and BTEC IT
- Teacher dashboard with course, class and quiz summary routes
- BTEC Unit 21 Learning Aim A workbook
- GCSE Characters workbook
- GCSE Characters quiz
- Draft BTEC Learning Aim A quiz
- Older GCSE CPU sample workbook and quiz

## Future Supabase Stage

Supabase will later provide:

- Authentication
- Profiles and roles
- Published learning item records
- Quiz responses
- Quiz scores

Roles must come from a `profiles` table. There must not be a role selector on the login page.

Row Level Security must enforce real access control. Front-end redirects are useful for user experience but must not be treated as the security layer.
