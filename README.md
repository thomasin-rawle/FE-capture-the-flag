# Flag Land 
## Northcoders Final Group Project
FlagLand is a real mobile application which emulates the popular school ground game of capture the flag. 

This project largely showcases a lot of the skills we have learnt throughout our time at Northcoders and also demonstrates our ability to learn and apply new technologies.


## Game Play
The aim of this game is the collect a flag, which will be generated at random locations and drop it off in a designated "Drop-off" zones. Doing so will accumulate points, bragging rights and an all round good time. 

## Functionality 
### Loggin In/Register
The game will start with a login screen. This will give users the chance to login and have access to their details. If the user does not have any login details, they can register and set up a new profile. 

This data interacts with the backend API by sending GET/POST requests and stores the data in the React Native AsyncStorage.
Details of the Backend API may be found on Github: https://github.com/JacobMurray/Backend-project.

### Main Screen - Map
Once logged in you will be directed to the main map screen. This will show your current location and also the location of the flag. 

As soon as the user is within 20m of the flag, the flag will turn green and the option to click and capture it will be available. Once a flag is collected a drop off zone will be generated. 

To collect points the user needs to walk in the drop-off zone. This will increase the score tally and also generate a new flag to collect.

All flags will be saved the current user, so if the game was to be restarted unexpectedly, the user would keep the same flag.

To maximise the fun potential - Collect - Drop - Repeat

### Main Screen - Drawers
There are 2 drawers on the front page. The left hand side allows you to access the users details where the following can be found:
* Username
* Profile Picture 
* Score
* Distance to the nearest flag
* Log out button

The right hand side will show the leaderboard of all the users in the database at that time. 

### Log Out
On the left hand drawer there is the option to log out of the app. Logging out will clear the AsyncStorage and also take the user back to the login page. 

## Installing a Local Copy

These instructions will help you to get a copy of Flag Land up and running on your local machine.

### Installing
Please ensure you have Expo installed on your machine, to check if Expo is installed please type the follwoing into your terminal.
```js
$ expo --version
```
if no version is given please find instructions on installing Expo here: https://docs.expo.io/versions/latest/introduction/installation

Duplicate or fork this repository from https://github.com/tommyrawle/FE-capture-the-flag
and enjoy!

## Built With
* React Native
* Expo
* MongoDB
* Node JS
* Express JS
* Passport JS

## Author
FlagLand Project group - In association with Northcoders