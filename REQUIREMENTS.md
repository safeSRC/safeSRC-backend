# Software Requirements

## Vision
_What is the vision of this product?_
This product endeavors to create a database that will supply a user with resources relevant to their specific need. These resources will provide alternatives to notifying official emergency services such as the police department.
_What pain point does this project solve?_
This project hopes to solve any emergency need that may present itself, by providing services that aim to circumvent the need for police, thereby avoiding a potentially dangerous situation created by the culture and inefficient training of police officers.
_Why should we care about your product?_
The current social and political climate have created a dangerous situation for many individuals to seek help in dire situations. This includes members of marginalized communities, and those that require immediate help, but don’t wish to involve officers with guns in their struggle. As we’ve seen time and time again, delicate situations are often made worse by self-possessed individuals with a badge and a weapon.

## Scope (In/Out)

_IN: What will your product do_
The app will provide users with phone numbers and locations of community solutions as alternatives to calling police.
It will provide the information for emergency hotlines, shelters, facilities and volunteer workers that can provide support depending on what is needed. Different categories will be displayed that the user can select.
These categories will include support for those that struggle with drug addiction, individuals fleeing from domestic abuse, environments that harm children, and options for nero-atypicals to receive community aid.
_OUT: What will your project not do_
This project will not physically connect users to the services they are looking for. Users will have to make the calls themselves.
There also will not be a Twitter bot that scrapes information on lesser-known community projects.

## MVP
_(courtesy of Ben Francka)_
Create a functional API that stores information for emergency services/resources as an alternative to calling the police.  
Create Tables, Models, Controllers for one or two cities and relevant organization data by category, with the infrastructure present to expand nationwide. 
Implement and employ Cheerio to web-scrape sites for table data, and hard code where necessary.
Create an Authorization layer for agencies or users to update data from the front end (encourage community based database management).
Implement routes that allow for searching by city/location

## Stretch
Expanded database that provides information on services available nationwide.
Geo location feature that searches by a user’s current position
Automated emails to self-inducted organizations to update their information.


# Functional Requirements

## Admins:

An admin for the overall app can create and delete emergency resources from the database.
An admin can update emergency resource information/location data
Admin has overall approval on submitted resource information from all types of users.

## Users:

### Organizations(Emergency Resources):

Organization Users can create profiles for themselves/add their resource information via a form on the site.
Organization Users can delete and update their profiles.

### Users (Clients):

Can create an emergency resource profile to be submitted for review by Admin.
Can access database of emergency resources based on submitted location/GPS.

## Results/Data (Emergency Resources):

Upon Organization User’s profile submission/approval, the resource data/info will be added to the appropriate table in the database.
Upon User Client’s Emergency Resource submission/approval, the resource data/info will be added to the appropriate table in the database.
Upon update of Org User or User Client’s submission and approval, the resource data/info will be updated on the appropriate table(s) in the database.
Upon delete of Emergency Resource by Organization User or by Admin, data/info will be removed from the appropriate database table(s).
When a User Client enters their location, they are able to define their emergency based on categories.
Upon selection of a category, the User Client will be presented with a list of resources based on location submitted/GPS.
If there are no resources in the area of the User Client then an alternate page will be displayed with national resources of the same category.


# Non-Functional Requirements 

## oAuth
An important non-functional requirement this app uses is oAuth. By connecting a Google account, organizations can log in and post/edit their resources without needing to create an account manually. Using authorization helps provide security and reliability with the information being provided. 

## Usability
Another important non-functional requirement being used in this app is usability. The interface is intended to be simple and clean, with minimal buttons in order to help the user get to their resource as quickly as possible in the time of an emergency.  The color scheme ensures accessibility is taken into account and easy for any user to see. 

# Data Flow

## Loading/Landing Screen
 The user opens the page and is met with a search bar asking for them to enter their city and state then submit with a button.

## Emergencies
 Once submitted, the emergency page loads (assuming there are resources for the specified city). The user is met with one question: ‘What is your emergency?’. From here, the user is able to select from different categories via buttons.

## City Resources
 Once the user selects their emergency, they are brought to the page of resource for their city and able to choose whichever resource is best suited for them.

## National Emergencies
 If there is no data for the users specified city, they are directed to a page letting them know there won’t be any local resources. VIia buttons, it asks to select what type of emergency - similar to the emergency page.

## National Resources
 Once selected, the user is directed to a page with national resources for the specified emergency. 

