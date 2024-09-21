# Quiz Time
![Am i responsive](assets/images/am-i-responsive.png)

---

## Contents:

* UX
    * Project Goals
    * User Goals
    * User Stories
    * Designer Goals
    * Design Choices
        * Fonts
        * Colours       
* Wireframes
* Features
* Future Goals
* Technology Used
* Testing
    * Issues and Resolutions
* Known Bugs
* Deployment
* Credits
* Acknowledgements

---

## UX (User Experience)

### Project Goals

The goal of this project is to create a simple layout and an easy to use quiz that gets all data from a trivia API to allow for a constant feed of questions based on category, difficulty and the amount of questions that are all selected from the user. This gives the users a reason to come back and carry on playing when they have completed the quiz due to the option of different categories and difficulty.

### User goals

The main expected user could be anyone but expected to fall into any of these criteria

1. A casual user
2. Someone wanting a quiz to complete with little to invest
3. Quiz enthusiast

With regards to other sites online, this site ideally needs to be

1. Easy to use and navigate
2. Be quick and easy to start and complete
3. Be able to restart or select a new quiz once completed
4. Be updated with new content regularly
5. Visuallly appealing but not to confusing


### User stories

1. As a user i want the site to be easy to navigate with a simplistic yet colourful design
2. As a user i want to be able to choose what questions i am given
3. As a user i want to be able to select how hard the questions are so any any range can play it
4. As a user i want to be challenged!
5. As a user i want to come back and know i'm getting new questions not the same quiz over and over.

### Designer goals 

1. Create a simple but engaging quiz game
2. Minimise the need for constant updates by using API for data
3. Be engaging enough to make users want to come back after intial use.

### Design Choices

#### Fonts

Due to the simplistic approach of the design i decided to use one font so everything was consistent from the start to the end of my quiz. I decided on Arial as it is a
very easy to read font allowing content to be able to be easily read and understood on all devices.

#### Colours

After discussing various colour combinations with potential users of this site and googling different colour palletes, i decided upon the following colours allowing for a clean and simple colour pallet with good contrast ratios.


* Background color of page: #383838 
* Background color of answers: #fff
* Title & Content: #06a872
* Text and social icons: #06a872
* Text over answers: #06a872
 
---

## Wireframe Mockup:

![Wireframes](assets/images/wireframes.png)

---

## Features

The primary feature of this site is to provide a quiz application to users that will allow the users input on the type of quiz they complete. Explained more down below.

### Select a topic

The user is given the option to choose what topic of quiz they would like to complete.

### Select Difficulty

For younger users or for extremely smart users, they are offered a difficulty option ranging from Easy, Medium or Hard.

### Select Number Of Questions

Depending on if users would like a long quiz or a short quiz they are given the option from 10 to 25 questions to decide from.

### Correct/Incorrect Indication

When the user selects an answer they are presented with either a green background or a red background on the answer they picked to indicate if they were correct or incorrect.

### Full Playable Quiz To Users Choice

With the implementation of all of the above features, this allows the user to have a customised quiz to their liking.

---

## Future Goals

As this application develops going forward the future goals for the site are

### Leader Boards

Currently the user is presented with a score upon completion of the quiz, ideally in the future, the addition of a leader board could incentivise users to keep coming back and playing to try and beat their own score or someone elses.

### Timed Mode

In the future i would also like to add another option for the user to select called "Timed Mode". This option would provide the user with a time limit that they have to pick an answer for the given question in, if the user does not pick an answer in the time they automatically skip the question by default.

### Correct Annswer

In the future i would also add a feature where if the user has answered a question incorrectly the background colour of that answer would go red but the background of the correct answer would go green so the user would then know the right answer for next time.

---

## Technology Used

* HTML 
* CSS 
* JavaScript 
* [GitPod](https://codeinstitute-ide.net/) - The application used for all the coding
* [GitHub](https://github.com/) - To host the repositories for this project and the live 
website preview

---

## Testing

As this was my first time developing with the use of JavaScript and an external API to receive the quiz data from i ensured i was extremely thorough with testing to ensure that every function ran correctly and data was provide to the DOM correctly without any issues. By being thorough with all my testing it has greatly improved my understanding of JavaScript.

#### Test Planning

As this project is the most complex thing i have worked on, i wanted to ensure that a methodical approach was taken with constant feature testing throughout development. In it's initial state i created dummy html items to ensure data was being passed and displayed correctly and as expected. In future projects i will look to using more automated testing to aid me in my development. 

#### Testing Stories

* While i was developing the site i was told my colour pallete was a bit boring and generic, this is when i then decided to look for different alternatives and implemented a new colour scheme.

* Initially when i was planning i was going to add every question and correct answer individually until i came across the use of API which i found much easier to use and also sped up my progress. Due to the use of API i then decided to take full advantage of it and use the options for categories, difficulty and amount of questions.

