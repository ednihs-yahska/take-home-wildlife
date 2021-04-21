# Take Home Wildlife Project

### Notes from Akshay
* I have implemented a card interface where the students can click on the card to flip it, or drag the card right/down if they know the answer or drag the card left/top if they were wrong.
* I preload 5 images into browser cache after every 5 cards are viewed for faster image loads.
* I have provided simpler button controls at the bottom of the page as an alternative to dragging interaction for
better accessibility
* I have created a custom CSV parser and a simple testing library to very the CSVParser works as expected.
The grammar for the CSV was referred from (https://tools.ietf.org/html/rfc4180) [RFC 4180] 
* The website is responsive and tested on all virtual devices available on chrome debugger

### Known issues
* On Safari the flipped card still shows inverted credit element.

### Future Scope
* I wanted to map each card image to only one property of the animal as that is considered to be a good flashcard.
* I would like to create flashcard from the animal properties to animal images (inverted)
* Ability to create flashcards

### What we’d like you to build:

For this demo project, we would like you to create a flash card app to display samples of wildlife species.

A project boilerplate has been provided using webpack and React, but you are not required to use either. You may need to add additional files and folders to the project, but do not add additional dependencies or 3rd party libraries.

### Project details

* The application should load data from this file: (http://take-home-wildlife.s3-website-us-west-2.amazonaws.com/data.csv)
* The app should display each of the animals listed in the file as a flash card. The initial view of the flash card will contain the image and attribution (credit) but no other details.
* When an image is clicked, the following information will appear, identifying the species:
    * Class
    * Order
    * Family
    * Genus
    * Species
    * Common Name
* The app display should work across various device widths (phones, tablets, PCs).
* Do not add additional visual components aside from any necessary controls to view the cards.

### Submission instructions:

* Go to the Github repo for this project (https://github.com/osuecampus/take-home-wildlife) and clone the repo locally to your machine.
* Run the application locally using `npm install` and `npm start`.
* Modify the code locally to accomplish the demo requirements.
* Push your completed project to a public repo in your own personal Github account and email Danielle.Franklin@oregonstate.edu the address of the public repo so we can review it.

### Notes and reminders:

* You cannot bring in any additional dependencies. You must use CSS, HTML, and Javascript to accomplish this project.
* The data file and images should be loaded by the app at runtime. Do not store the animal info or images locally in the project.
* The goal of this project is to demonstrate front-end development but not be a test of how long is spent polishing the end result. Please spend no more than 2-4 hours on development, and be prepared in the interview to discuss design decisions and tradeoffs you made while implementing this app

### Resources:

- React: https://reactjs.org/docs/getting-started.html
- Webpack: https://webpack.js.org/
