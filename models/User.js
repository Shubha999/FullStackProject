const mongoose = require('mongoose');
const { Schema } = mongoose;

//Use Schema object to create a new User collection with properties
const userSchema = new Schema({
	googleId: String,
});

//to create an actual model class and to be aware of the collection needed. users is name of collection
mongoose.model('users', userSchema);
