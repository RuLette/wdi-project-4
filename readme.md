# Qraft


### Overview

 Qraft is a full stack web application for furniture makers to showcase DIY or handmade pieces. A 'qraft' is a moniker for pieces of furniture uploaded by the user for the site.

 Users who are logged in can access more of the app's functionality including:

   - View user profile
   - View more details about the qraft created
   - Upload photos of qrafts
   - Post, edit or delete a qraft
   - Follow furniture makers and contact them for custom orders.
   - Leave comments about pieces of furniture
   - Edit personal profile details, or delete their account

   ![qraft](https://user-images.githubusercontent.com/29276064/57179757-0544bd80-6e79-11e9-8dfe-3562342a703b.png)

## Project Brief
With a time frame of 7 days, create a full-stack application utilising Python Flask, with data served from a PostgreSQL database. The database should demonstrate CRUD functionality and models should demonstrate multiple relationships.

The API should have a front-end built with React.

## Timeframe
7 days

## Technologies used
- HTML5
- SASS/SCSS
- JavaScript (ES6)
- React
- Webpack
- Insomnia
- PostgreSQL
- SQLAlchemy
- Python 3.7
- Flask
- Git/GitHub
- React Semantic UI

## Deployed web app
qraft.herokuapp.com

## Development process

The first step of the project was to plan the models and database structure.
Wire framing was made with pen and paper, before I used Trello to manage the project.

### BackEnd

The main Python framework used was Python-Flask, with SQLAlchemy utilised for database interaction.

Flask methods such as Blueprint were used to register routing logic to the application.

As data retrieved from the PostgreSQL database via SQLAlchemy were objects, the Flask Marshmallow library was used for serialising models into JSON strings. Marshmallow could then be used for validating schemas and formatting data such as timestamps.

Once the database was functional, models and routes were created. The first model created was the user, followed by the qrafts that were relational to the user. Comments and followers were attached to the user model. Once the CRUD routes and testing were working with requests made in Insomnia, I could move onto creating the frontend of the application using React.

### Frontend

I first created the login and register pages for users, before creating the index, home page, and show page for qrafts.

The data from the backend database often had to be filtered as the information came back in an object or array. For instance, in the case of filtering the qrafts by materials created, the reduce method was used to spread the data from materials into a new array.

~~~
axios.get('api/qrafts')
  .then(res => {
    console.log(res)
    const materials = res.data.reduce((acc, qraft) => {
      const existingIDs = acc.map(qraft => qraft.id)
      const newMaterials = qraft.materials.filter(material => !existingIDs.includes(material.id))
      return [...acc, ...newMaterials]
    }, [])
~~~

The front end of the application required the use of several ternary operators, and several JavaScript ES6 features such as the spread operator, map and filter to extract data from the backend.

For styling the application, I used front end framework React Semantic UI. As it was my first time using this framework, I had to read the documentation provided by Semantic UI to implement the framework on forms, user comments and page layouts.

## Challenges

One of the biggest challenges in building this application involved directing information for users who were authenticated and those who were just browsing the site. Another layer of complexity included allowing only users who are logged in to edit qrafts which belonged to them, which meant the application needed information from the back end database about who the user browsing the page is.

In the backend, the definition of the current user (the user logged in) was and saved by a flask object known as g.

```
        g.current_user = user
```

 In the front end, this data could be accessed and used to define if the user id matched that of the user logged in.

~~~
getUser() {
  axios.get(`/api/users/${Auth.getPayload().sub}`)
    .then(res => {
      this.setState({ currentUser: res.data })
    })
}
~~~

As this was a solo project, the time frame given to complete the application - 7 days meant I had to recognize there was alot of functionality I still wanted to add.

## Future features

- User profiles would display how many followers each user has
- Users who are logged in can like qrafts they admire
- A messaging function between users
