# Train Parcel

This is the web application which is useful for Parcel Office Managers and Customers. It helps them to book a slot for sending a parcel, checking the live status and doing other management tasks digitally.


# Actors and their functionalities

- **User**
    - Send a package and can select the source and destination city of where he wants it to reach. 
    - Track package from serial number provided and check package live status.
    - Receive alerts of package status on both sender and receiver ends.
- **Office Manager**
    - See dashboard for pending, loaded and arriving packages for his city.
    - Assign train to a particular package.
    - Load/Unload a package.
- **Super Admin**
    - Assign Manager to a particular office, change roles of users, add cities, statuses, trains, roles, etc.

# Project Setup Instructions

## Install

    $ git clone https://gitlab.com/akzarma/train-parcel.git
    $ cd train-parcel
    $ npm install

## Configure app

- Create a postgres database named 'trainParcel' and create a role with passoword to access it.
- Update these configurations in the `config/config.json` file.
- Create googleCreds.js file in `config` folder and enter your Google Developer credentials (clientId and clientSecret).
- Export these credentials to implement OAuth2 Login via Google.


## Running the project

    $ npm run nodemon
    
    
Visit  http://localhost:3000/register to render Registration Page.
