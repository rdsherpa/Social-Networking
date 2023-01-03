## Description

The social network api that I created demonstrate MongoDB in an action. The main function of this application is to help you create new users, post thoughts for that user. You can also react with comments.

User will also have an option to add other users as friend to their list and because of which they will be able to interact with each other's comments.

Lastly, features like users, thoughts, reaction, and list of friends can be deleted as well.

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation

Inorder to install this application, you need to clone the code in your terminal for the respective repository. You can the enter the following commands:

1. npm i
2. npm i express
3. npm i mongoose

## Usage

Once you have builded all the routes you can test them in Insomnia with API GET, POST, PUT, and Delete for Users, Thoughts, firends, and reactions.

## Technology Used

Node, Express.js, JavaScript, Html, Mongoose, MongoDB and Insomnia

## Questions

You can check my Github rdsherpa for the source code and also feel free you reach me out at sherpariwa@gmail.com

## Video Link:

I will be sharing a link to the video wher I will demonstarate how to create, update, add and delete users.
