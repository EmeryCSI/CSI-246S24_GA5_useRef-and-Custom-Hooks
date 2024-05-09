# Renton Technical College CSI-245

<br />

<div align="center">  
    <img src="logo.jpg" alt="Logo">
    <h3 align="center">Guided Activity 4</h3>
</div>

This repository is a part of CSI-246 at Renton Technical College.

## Guided Activity 5

1. Clone the repository to your local machine. (Do not use OneDrive for assignments in this course!)
2. Make note of the folder where you cloned the repository.
3. After you have cloned this repository navigate to your local repository using the cd command.
4. Open the repository in Visual Studio Code by typing `code .`

5. Open the terminal in Visual Studio Code by hitting ctrl + \` or cmd + \` on mac.
6. Create a new React project in the current directory using vite
7. Name the project citylist
8. Select React as the framework
9. Select JavaScript as the variant
10. cd into the new project folder and run:
11. `npm install`
12. `npm install react-router-dom`

![Alt text](<Images/GA4 - Step 12.png>)

13. Run `mkdir Screenshots` to create a Screenshots folder.

## Project Setup

1. Delete the contents of the App.jsx, App.css and index.css files.
2. Create a basic h2 inside of a fragment for App.jsx.
3. Take a screenshot and save it to your screenshot folder.

![Alt text](<Images/GA4 - Project Setup - Step 3.png>)

4. Included in the repository is a cities.js file, paste the contents of that file at the top of App.jsx
5. When complete your App.jsx should look like this. Notice that I have collapsed the cities array here, it is taking up 27 lines of code.

![Alt text](<Images/GA4 - Project Setup - Step 5.png>)

6. In Terminal, type `npm run dev`. Make sure you are in the citylist folder.
7. You should have just App as an H2 showing on the page.

![Alt text](<Images/GA4 - Project Setup - Step 7.png>)

8. Take a screenshot of the browser and save it to the Screenshots folder.
9. `git add .`
10. `git commit -m "project setup complete"`
11. `git push`

## Lets create some pages

1. Create a new folder inside of src called Pages.
2. Within this folder create the following Components. Create.jsx, Details.jsx, Home.jsx, and List.jsx
3. Within each component simply create an h2 with the name of the component.

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 3.png>)

4. Let's first test these new components out and make sure they are working.
5. Inside App.jsx import each of these components and display them on the page.

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 5.png>)

6. Take a screenshot of your browser and save it to your Screenshots folder.

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 6.png>)

7. Once you have verified they are working you can remove the components from inside of the return(). We are going to render these based on a route.

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 7.png>)

8. Lets create some Routes. We need to import some Components from react-router-dom. Add this to the top of App.jsx

`import { BrowserRouter, Route, Routes } from "react-router-dom";`

9. The BrowserRouter component must wrap all components that will use Routing
10. Within the BrowserRouter we will define Routes using the Routes and Route components
11. Replace the code inside of App.jsx with the following:

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 11.png>)

12. We have defined 4 routes. If no route is provided we will show the Home Page.
13. If we navigate to /cities we will show the List page.

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 13.png>)

14. If we navigate to /cities/create we will show the Create page.

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 14.png>)

15. If we navigate to /cities/1 we will show the Details page

![Alt text](<Images/GA4 - Lets Create Some Pages - Step 15.png>)

16. Verify that these routes are working by running the app and navigating to them.
17. Take a screenshot of each page and save them to your screenshots folder.
18. `git add .`
19. `git commit -m "Routes working"`
20. `git push`

## Create navigation and Context

1. Create a Components folder inside of the src folder.
2. Add a Navigation.jsx component to that folder.
3. At its core a navbar is simply a styled list of links.
4. We will be using the Link component from react-router-dom.
5. Replace the code inside of Navigation.jsx with the following:

![Alt text](<Images/GA4 - Create Navigation and Content - Step 5.png>)

6. Notice that the to attribute of these links is the same as some of the routes you define earlier.
7. Import Nagivation to App.jsx and render it within the browser router but before the routes.

![Alt text](<Images/GA4 - Create Navigation and Content - Step 7.png>)

8. Run the app and verify that Nagivation is working:

![Alt text](<Images/GA4 - Create Navigation and Content - Step 8.png>)

9. Take a screenshot of the browser and add it to your Screenshots folder.
10. It is now time to useContext.
11. Context is a global state container that can be used by any component without passing via props.
12. We are going to add two things to context. The list of cities and a function for creating a new city.
13. citiesList will be tracked by state in App.jsx but shared with the other pages via context.
14. Similarly the createCity function will also be in App.jsx but accessible to the other pages via context.
15. Lets first create the citiesList state and createCity functions.
16. At the top of App.jsx add an import statement for useState and createContext.

`import { useState, createContext } from "react";`

17. Inside of the App() function but before the return statement add the cities to a state variable called citiesList.
18. Also inside of App() and before the return statement create a function that takes a city as a parameter, assigns it an id and then uses setCitiesList to update the list.

![Alt text](<Images/GA4 - Create Navigation and Content - Step 18.png>)

19. We are now ready to create a ContextContainer. This is done using the createContext method that we imported earlier.
20. Create a CitiesContext before the function App()

![Alt text](<Images/GA4 - Create Navigation and Content - Step 20.png>)

21. Our new CitiesContext is ready to be used. We need to wrap all elements that will have access to this Context in a CitiesContext.Provider component. The value attribute will be used to specify which object we would like to provide through this context.

![Alt text](<Images/GA4 - Create Navigation and Content - Step 21.png>)

22. We have wrapped all of our routes with our new Context and added both citiesList and createCity to that context. We now must also export the CitiesContext so that it can be imported by our other pages. Add the following to the bottom of App.jsx

![Alt text](<Images/GA4 - Create Navigation and Content - Step 22.png>)

23. `git add .`
24. `git commit -m "Context added"`
25. `git push`

## Accessing the Context

1. Lets work on the Details page first.
2. In the route created for the details page we can see that details takes an id.
3. We will need to get that id from the route and then go through the citiesList to find the city with a matching id.
4. We will need access to the citiesList from context as well as the useParams method from react-router-dom to get the id from the route.
5. import the following at the top of Details.jsx

![Alt text](<Images/GA4 - Accessing the Context - Step 5.png>)

6. useContext allows us to access our CitiesContext, useParams() will give us the id from the url
7. Replace the Details function with the following code:

![Alt text](<Images/GA4 - Accessing the Context - Step 7.png>)

8. Run the app and test it out. If you navigate to /cities/1 you should see the following:

![Alt text](<Images/GA4 - Accessing the Context - Step 8.png>)

9. Providing a different id will give you a different city.
10. Take a screenshot of the browser and save it to your Screenshots folder.

11. Now we are ready to work on the list. This list page will show all of the cities in the list and provide a link for each city to the Details page.
12. The List page will import useContext, CitiesContext, and Link
13. At the top of the List page add the following:

![Alt text](<Images/GA4 - Accessing the Context - Step 13.png>)

14. Replace the List Function with the following:

![Alt text](<Images/GA4 - Accessing the Context - Step 14.png>)

15. You should now have a functioning list page that links to the details page.

![Alt text](<Images/GA4 - Accessing the Context - Step 15.png>)

16. Take a screenshot of the browser and save it to your Screenshots folder.
17. `git add .`
18. `git commit -m "List and Details Complete"`
19. `git push`

## The Create Page

1. Our create page will allow the user to add a new city to the list.
2. It will contain a form and need access to the creatCity function that we added to Context.
3. We will need useContext and the CitiesContext for create.
4. Add these import statements to the top of Create.jsx
5. Lets start with the HTML for this page first since it is fairly long.
6. Create an HTML form for adding a city and set the onSubmit event to call a function called handleSubmit

![Alt text](<Images/GA4 - The Create Page - Step 6.png>)

7. Now lets work on our handleSubmit function. This function will take in an event. The event will have the information from the form. By default events cause a page refresh which we do not want since we are handling the client side. Prevent the default refresh and then get the data from the form. We then pass the data to the createCity function and reset the form.

8. Replace the code inside of Create() with the following:

![Alt text](<Images/GA4 - The Create Page - Step 8.png>)

9. Use the form to create a new City.

![Alt text](<Images/GA4 - The Create Page - Step 9.png>)

10. Navigate to the Cities List and you should see your new City added to the list.

![Alt text](<Images/GA4 - The Create Page - Step 10.png>)

11. Click on the new city and observe the Details page.

![Alt text](<Images/GA4 - The Create Page - Step 11.png>)

12. Add styling to the navbar so that it looks like navigation and not simply a list of links.
13. Style the form so that it is centered and inside of a container.
14. You may use any css library that you wish or write your own.
15. Here is an example. You do not need to match it exactly.

![Alt text](<Images/GA4 - The Create Page - Step 15.png>)

16. `git add .`
17. `git commit -m "Assignment Complete"`
18. `git push`

If you have any questions about this assignment please reach out to myself or our TA for this course.
