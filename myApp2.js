require('dotenv').config();
const mongoose = require('mongoose');


// #1
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// #2
var Schema = mongoose.Schema;

var personSchema = new Schema ({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model('Person', personSchema);

let danyloDen = function(done) {
  return new Person({
    name: "Danylo Denysevych",
    age: 20,
    favoriteFoods: ["Cheese", "Burger"]
  });
  if (error) return done(error);
  done(null, result);
};



// let Person;

const createAndSavePerson = (done) => {
  const person = new Person ({
    name: "Danylo", age: 20, favoriteFoods: ["Cheese", "Bacon", "Sausage"]
  })
  person.save(function (err, data) {
    done(err, data);
  })
};


// many people array

let arrayOfPeople = [
  {name: "Danylo", age: 20, favoriteFoods: ["Cheese", "Bacon", "Sausage"]},
  {name: "Igor", age: 21, favoriteFoods: ["Beer", "Meat", "Sausage"]},
  {name: "Sanya", age: 22, favoriteFoods: ["eggs", "Bacon", "Faceit"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error,createdPeople) => {
    if(error){
      console.log(error)
    } else {
      done(null, createdPeople);
    }
  });
};


// Find a person by name 
Person.find({name: 'Kyle', age: 20}, (err, data) => {
  if(err){
    console.log(err)
  } else {
    console.log(data)
  }
})

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, arrayOfResults) => {
    if(err) {
      console.log(err)
    } else {
      done(null, arrayOfResults);
    }
  })
};


// Use model.findOne() to Return a Single Matching Document from Your Database

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: {$all: [food]}}, (error, result) => {
    if(error) {
      console.log(error)
    } else {
      done(null, result)
    }
  })
};


// Finding a person by ID

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, result) => {
    if(error) {
      console.log(error)
    } else {
      done (null, result)
    }
  })
};


// Finding a person, than changing one of the lines (foods array in this case, and then save it to DB)
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      result.favoriteFoods.push(foodToAdd)
      result.save((err, newRecord) => {
        if (err){
          console.log(err)
        } else {
          done(null, newRecord)
        }
      })
    }
  })
};


// Find one person by its name and then update the age for that person
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, newAgeData) => {
    if (err) {
      console.log(err)
    } else {
      done(null, newAgeData)
    }
  })
};


// find a person by ID and remove him
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedData) => {
    if (err) {
      console.log(err)
    } else {
      done(null, deletedData)
    }
  })
};

// remove all the objects with the name nameToRemove
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedObjects) => {
    if (err) {
      console.log(err)
    } else {
      done(null, removedObjects)
    }
  })
};

// filter the search in the Array
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: {$all: [foodToSearch]}})
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((err, filteredResult) => {
    if (err) {
      console.log(err)
    } else {
      done(null, filteredResult)
    }
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */



//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
