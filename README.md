# ASSN02

## Name and ID
```
Vending Machine Stock Management System
Name: Wuzhen Ye
Student ID: 20086431
```

## Functionality
- Server:
```
3 models: beverages, administrators and comments

10 routes are included in beverages.js:
4 GET (Users can find all records, find records by ID, type; They can also get records using fizzy searches by entering key words in the beverage name),
1 POST (Add record to database),
3 PUT (Add the amount of certain beverage; Update the price of certain beverage; Update all the info of a certain beverage),
2 DEL (Delete record by ID, name)

6 routes in administrators.js
2 GET (find all records, find By username),
3 POST (Users can log in by entering their username and password. If their entry is correct, a token will be generated, by which they can reenter the system again in 30s because the token will expire 30 seconds after they first enter their account information; add administrator record),
1 DEL (Delete administrator by ID)

4 routes in comments.js
2 GET (Users can find all records, find records by ID),
1 POST (Add record to database),
1 DEL (Delete record by ID)
```
- Client:


![][home]

>>Shows homepage and has a link to login page

![][beverages]

>>Shows all records and allows the user to edit, remove, filter

![][edit]

>>Edits existing record, entered from manage beverages page

![][add]

>>Adds new record

![][map]

>>Shows the locations of all existing vending machines

![][contact]

>>Allows the user to add comment

![][login]

>>Allows admins to log in

![][logout1]

>>Before admins log in

![][logout2]

>>Allows admins to log out after they log in


- Framework used:
	- Client:
		- Vue CLI
		- Vue-Router
		- Node
	- Server:
		- MongoDB
    	- Vue.js
    	- Express
    	- Node

- Third Party or Google API
	- Google Map API

- Cloud Support/acts as BaaS
    - Server: [heroku](https://assn01-prod.herokuapp.com/)
    - Client: [firebase](https://assn02-prod.firebaseapp.com)

## UML Diagrams & Use Cases

![][sd]

>>Sequence Diagram

![][uc]

>>Use Case

## Database Schemas
```
Beverage Schema
Administrator Schema
Comment Schema
```

## Git approach adopted and link to git project
- Client: [gitHub](https://github.com/mrbrocco1i/ASSN02.git)
- Server:
	- [gitHub](https://github.com/mrbrocco1i/ASSN01.git)
	- [gitLab](https://gitlab.com/20086431/assn01-cicd.git)

## UX/DX approach adopted
- UX:
	- Navigation bar used
	- UI Guidelines adhered to

- DX:
	- Data Validation used (validate the length of input, etc.)
	- Adherence to JS Best Practices
	- Repo Usage (git used locally, gitHub used in remote)
	- Automated Testing used (cypress)


## References

- Node.js API Authentication With JWT
    - [link 1](https://www.npmjs.com/package/jsonwebtoken)
    - [link 2](https://youtu.be/7nafaH9SddU)

- Fizzy Searches
    - [link 1](https://mongoosejs.com/docs/api.html#model_Model.find)
    - [link 2](https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression)

- [Google Map API](https://developers.google.com/maps/gmp-get-started)



[home]: ./screenshots/home.png
[beverages]: ./screenshots/beverages.png
[edit]: ./screenshots/edit.png
[add]: ./screenshots/add.png
[map]: ./screenshots/map.png
[contact]: ./screenshots/contact.png
[login]: ./screenshots/login.png
[logout1]: ./screenshots/logout-beforeLogin.png
[logout2]: ./screenshots/logout-afterLogin.png
[sd]: ./sequence-diagram.png
[uc]: ./use-case.png
