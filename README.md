# Labelig tool for FD

1. Clone the repo `git clone https://github.com/puppylet/fd-labeling.git`
2. Go to the repo's dir `cd fd-labeling`
3. Create the env file `cp packages/client/.env.example packages/client/.env`
4. Install the dependencies `npm install`
5. Start the app `npm start`
6. The project will run on http://localhost:3000
7. The app will create the directory `{PROJECT_ROOR}/packages/express/data/source`. Copy your data here and reload it at http://localhost:3000.
8. On the app, select the photo (this should be done automatically). On the keyboard, hit 1 => empty, 2 => fulfilled, 3 => rejected
