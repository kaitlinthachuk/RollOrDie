RollOrDie is a React App that helps DMs keep track of all of the moving components in combat.

## Available Scripts (from Create React App documentation)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Adding a Party
1. Starting from the main screen select the 'Parties' option.

![main screen](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/main_screen.png)

2. On the "Your Parties" page, select "Add Party".
3. Replace the placeholder with your own name for the new party.
4. Add players to the party using "Add Player". Input the name of the player and select their AC (Armor Class) from the slider.

![add player](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/add_player_to_party.png)

5. Once you have added all the players, hit "Save" in the top righthand corner. You should be able to see your new party on the "Your Parties" page. This party will be saved and will persist between sessions (and opening and closing the app) until you delete it.

![parties](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/your_parties.png)
