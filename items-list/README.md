### Public lost items list v.0.1

## Stack
 - Next (16.0.7)
 - lucide-react (0.556.0)
 - tailwind-merge (3.4.0)

## Setup
You need to have installed Node.js for this app to work. Get more info here: https://nodejs.org/en/download

In order to run app, you need to run `npm install` to install required dependencies.

After that, you can run the app via `npm run dev` if you want to host it on port 3000, or `npm run dev -- -p x` if you want to host it on other port, where "x" is port you choose.

## Docs
Pages:
 - /[district] - dynamic route for each starostwo, district basically filters announcements by stratostwo, exaple: /startostwo-bartoszyce
 - /[district]/[id] - finding and showing single announcement by id, district is nessesarry, but isn't validated in this case, exaple: /a/164

Documentations for each component and function are in their components files.

## Serving
This app supports being embed via iframe, like: <iframe src="http://localhost:300/starostwo-białystok"/>, with all it's features