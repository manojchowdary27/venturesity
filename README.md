# venturesity Front end challenge

## Problem statement 

> You're required to create a single page web application which has a "GET FORM" button. 
> Upon clicking the button a request should be made to the form api and render the form using the information received in the response. 
> Once the form is rendered, the user must be able to "SUBMIT FORM". 
> And also the user should be allowed to repeat this process

## API usage:
### Get Method
``` curl -X GET "https://randomform.herokuapp.com" ```

### Post Method
```curl -X POST -H "Content-Type: application/json" -d '{ "foo": "bar","bar": "foo"}' "https://randomform.herokuapp.com/submit" ```


	-	index.php - used to redirect
	-	index.html - Main template code
	-	js/app.js	- contains Main Angular Js Code
	

#### For Live Demo
* visit [link](https://venturesityhiring.herokuapp.com/) hosted on herokuapp
