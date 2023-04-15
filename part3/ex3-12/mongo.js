const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Password required in as an arguement for authentication");
    process.exit(1);
}

const password = process.argv[2];

const url = process.env.MONGODB_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const contactSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
});

const Person = mongoose.model("persons", contactSchema);

const param_name = process.argv[3];
const param_phoneNumber = process.argv[4];
const newPerson = new Person({
    name: param_name,
    phoneNumber: param_phoneNumber,
});

newPerson
    .save()
    .then((result) => {
        console.log(
            `Added ${param_name} number ${param_phoneNumber} to the phonebook~`
        );
        mongoose.connection.close();
    })
    .catch((err) => console.log(err));

Person.find({})
    .then((result) => {
        result.forEach((personContact) => {
            console.log(personContact);
        });
        mongoose.connection.close();
    })
    .catch((err) => console.log(err));
