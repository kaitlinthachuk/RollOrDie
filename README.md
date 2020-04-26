RollOrDie is a React App that helps DMs keep track of all of the moving components in combat.

## Table of Contents
- [Available Scripts (from Create React App documentation)](#available-scripts--from-create-react-app-documentation-)
  * [`npm start`](#-npm-start-)
  * [`npm run build`](#-npm-run-build-)
- [Creating and Updating a Party](#creating-and-updating-a-party)
- [Creating an Encounter](#creating-an-encounter)
- [Encounter Features](#encounter-features)
  * [Hit Points](#hit-points)
  * [Consciousness](#consciousness)
  * [DM Cheatsheet](#dm-cheatsheet)
  * [Effects Tracker](#effects-tracker)
  * [Full Monster Profile](#full-monster-profile)

## Available Scripts (from Create React App documentation)

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Creating and Updating a Party
1. Starting from the main screen select the 'Parties' option.

![main screen](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/main_screen.png)

2. On the "Your Parties" page, select "Add Party".
3. Replace the placeholder with your own name for the new party.
4. Add players to the party using "Add Player". Input the name of the player and select their AC (Armor Class) from the slider.

![add player](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/add_player_to_party.png)

5. Once you have added all the players, hit "Save" in the top right hand corner. You should be able to see your new party on the "Your Parties" page. This party will be saved and will persist between sessions (and opening and closing the app) until you delete it.

![parties](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/your_parties.png)

6. To update an existing party select it from the "Your Parties" page.
7. From here you will be able to remove players from the party, add new ones, rename the party, and view the current players and their ACs.

![party view](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/party_view.png)

## Creating an Encounter
1. From the main page select "Encounters".
2. On the "Your Encounters" page select "New Encounter".
3. First you will be taken to the Monsters page where you will be able to add all the monsters in the combat.

![monsters page](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/monster_menu.png)

Use the search bar to find the appropriate monster and the "+/-" buttons to add the correct number of monsters.

4. Next is to input players or a party. If you already have a party premade select "add party" and select the name of your party. This will pull up a screen asking for initiatives of the players currently in the party.

![party init](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/add_party_init.png)

Type in the initiative roles of each of the listed players and select done. You should now be able to see all the players in your party with their ACs and initiatives listed.

![party added](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/encounter_party_added.png)

If you do not have a party predefined or want to add on players from outside the party you can add their name, AC, and initiative and hit "Add Player".

5. You are now ready to start your combat! Hitting "Next" will take you to the main encounter view where you will be able to see your players and monsters and run the combat tracker.

Here's what a player looks like:
![encounter player](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/example_encounter_screen_player.png)
And a monster:
![encounter monster](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/encounter_enemy_start.png)

6. New encounters are saved and persist so if you want to set up a bunch of encounters before you play they'll be ready to go on the "Your Encounters" page!

![encounters page](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/your_encounters.png)

## Encounter Features 
### Hit Points
  * HP can be updated in the sidebar or on the main page
  * changes to HP will be propagated so an HP will be valid no matter where you look at it or update it
  * separate HP trackers for each monster

![hp](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/hp_update.png)

### Consciousness
  * Like HP, when a player goes unconscious you can simply check the box
  * changes to consciousness will be propagated so you will able to see in the sidebar or on the player's turn if they are unconscious

![hp](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/unconciouss_player.png)

### DM Cheatsheet
* see special features of monsters like resistances, advantages, and vulnerabilities
* see legendary actions which can be taken outside of combat order
* able to update HP and consciousness as it happens in combat
* see full combat order

![cheatsheet](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/cheatsheet.png)

### Effects Tracker
* keep track of effects when a spell or ability is used
* automatically calculates what round and on whose turn the effect expires

![effects](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/effects_sidebar.png)

### Full Monster Profile
* On a monster's turn you have access to all the monster details
* Easily see a monster's available actions and their corresponding bonuses
* View extra abilities the monster may have
* See all six abilities and their modifiers for checks and saving throws

![monster details](https://github.com/kaitlinthachuk/RollOrDie/blob/master/images/encounter_enemy_details.png)
