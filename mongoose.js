const mongoose = require("mongoose");
const dotenv = require("dotenv"); // To Store things i dont want display in my source code

// Configuring of installed MongoDB & Dotenv modules
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Error Connecting to MongoDB: ", err));


// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    age: Number,
    favoriteFoods: [String]
  });


// Creating the Person model
const Person = mongoose.model("Person", personSchema);

// Create a document instance using the Person constructor i built before

function createPerson(name, age, favoriteFoods) {
    const person = new Person({ name, age, favoriteFoods });
    person.save((err, data) => {
      if (err) {
        console.error('Error saving person:', err);
      } else {
        console.log('Person saved:', data);
      }
    });
  }

// creating many instances of my models 

  function createManyPeople(arrayOfPeople) {
    Person.create(arrayOfPeople, (err, data) => {
      if (err) {
        console.error('Error creating people:', err);
      } else {
        console.log('People created:', data);
      }
    });
  }

// Using .find() to Search my Database

function findPeopleByName(name) {
    Person.find({ name }, (err, data) => {
      if (err) {
        console.error('Error finding people:', err);
      } else {
        console.log('People found:', data);
      }
    });
  }

// using the .findOne method to search for a single match in the database (specific)

function findPersonByFavoriteFood(food) {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) {
        console.error('Error finding person:', err);
      } else {
        console.log('Person found:', data);
      }
    });
  }

// using the findbyid to find a specific unique id

function findPersonByIdAndUpdate(personId) {
    Person.findById(personId, (err, person) => {
      if (err) {
        console.error('Error finding person:', err);
      } else if (person) {
        person.favoriteFoods.push('hamburger');
        person.save((err) => {
          if (err) {
            console.error('Error updating person:', err);
          } else {
            console.log('Person updated:', person);
          }
        });
      } else {
        console.log('Person not found:', personId);
      }
    });
  }


// using the findOneAndUpdate method to find a person name and update it to 20.

  function updatePersonByName(personName) {
    Person.findOneAndUpdate({ name: personName }, { age: 21 }, { new: true }, (err, updatedPerson) => {
      if (err) {
        console.error('Error updating person:', err);
      } else {
        console.log('Person updated:', updatedPerson);
      }
    });
  }

//Deleting One Document Using .findByIdAndRemove

function deletePersonById(personId) {
    Person.findByIdAndRemove(personId, (err, deletedPerson) => {
      if (err) {
        console.error('Error deleting person:', err);
      } else {
        console.log('Person deleted:', deletedPerson);
      }
    });
  }

// Deleting Many Documents with model.remove()

function deletePeopleByName(name) {
    Person.remove({ name }, (err, result) => {
      if (err) {
        console.error('Error deleting people:', err);
      } else {
        console.log('People deleted:', result);
      }
    });
  }
  
// Performing a Chain Search Query Helpers to Narrow Search Results

function findPeopleByFood(food) {
    Person.find({ favoriteFoods: food })
      .sort({ name: 1 })
      .limit(2)
      .select('-age') // Excluding the 'age' field
      .exec((err, data) => {
        if (err) {
          console.error('Error finding people:', err);
        } else {
          console.log('People found:', data);
        }
      });
  }


