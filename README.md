# IParcel React-Native

react-native app for for IParcel a courier company, that can guide a driver to navigate to multiple pickup and dropoff locations. 

### enviroment:

using:

react-native: _v0.56.0_

react: _v16.4.1_

### How to run the app locally:

- checkout project from Github

- in root project folder, run `npm install` or `yarn`

- navigate to ios folder, run `pod install`

- open IParcel.xcworkspace and run in ios simulator

### How to test the app:

- Project have 1 screen with 2 tab 'List' and 'Map' and 1 Detail screen.

- Default we have mockup data 5 deliveries and 1 current location for driver.

- Data ordered by distance from pickup or dropoff location with driver's location.

- When update a status of delivery, it will re-calculate and detect a next point for driver base on distance.
