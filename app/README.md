### Public lost items list v.0.1

## Stack
 - Next (16.0.7)
 - lucide-react (0.556.0)
 - tailwindcss (4.1.17)

## Setup
You need to have installed Node.js for this app to work. Get more info here: https://nodejs.org/en/download

Also, you need to setup .env file with NEXT_PUBLIC_API_URL, like NEXT_PUBLIC_API_URL=http://localhost:8000/. It will allow the app to get announcements, and do add/edit methods. You also need 
NEXT_PUBLIC_LIST_URL for connection with public announcements list.

In order to run app, you need to run `npm install` to install required dependencies.

After that, you can run the app via `npm run dev` if you want to host it on port 3000, or `npm run dev -- -p x` if you want to host it on other port, where "x" is port you choose.

You can also deploy your app by running `npm run build`, and then `npm run start`.

## Docs
Pages:
 - / - home root with iframe to public announcements list.
 - /login - login page.
 - /admin - admin page with announcements to edit, add method, and more announcements options.
 - /admin/[id] - announcement details.
 - /admin/add - add announcement form.
 - /admin/edit/[id] - edit announcement.

To admin panel, only person with "admin" role can enter.

Documentations for each component and function are in their components files.

## Serving
This app supports being embed via iframe, like: <iframe src="http://localhost:300/starostwo-białystok"/>, with all it's features