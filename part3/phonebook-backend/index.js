require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const Person = require("./models/person"); //import the Note model

//To allow express to serve static content (HTML, JavaScript et cetera...)
app.use(express.static("build"));

//To parse raw data into JavaScript object and place into request.body
app.use(express.json());

//To allow cross origin resource sharing
app.use(cors());

const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response
            .status(400)
            .send({ error: `malformatted id => ${error.message}` });
    } else if (error.name === "ValidationError") {
        return response
            .status(400)
            .send({ error: `validation error => ${error.message}` });
    } else {
        return response
            .status(400)
            .send({ error: `general error => ${error.message}` });
    }

    //next(error)
};

//morgan middleware for logging purpose
const morgan = require("morgan");
morgan.token("body", (req, res) => {
    return JSON.stringify(req.body);
});
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :body"
    )
);

//custom made middleware logger
const requestLogger = (request, response, next) => {
    console.log("Method: ", request.method);
    console.log("Path: ", request.path);
    console.log("Body: ", request.body);
    console.log("----------");
    next();
};

app.use(requestLogger);

let phoneBook = [];

app.get("/", (request, response) => {
    response.send("<h1> Hey!</h1>");
});

app.get("/info", (request, response, next) => {
    Person.count({})
        .then((totalContact) => {
            const currentDate = new Date();
            response.send(`Phonebook has info for ${totalContact} people <br>
        Request received on => ${currentDate}`);
        })
        .catch((error) => next(error));
});

app.get("/api/persons", (request, response, next) => {
    Person.find({})
        .then((persons) => {
            response.json(persons);
            //mongoose.connection.close()
        })
        .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
    //const personId = Number(request.params.id)
    //const userIdContact = phoneBook.find(contact => contact.id === userId)
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                //true if a contact is found
                response.json(person);
            } else {
                response.status(404).end();
            }
        })
        .catch((error) => {
            //console.log(`Error 'GET:/api/persons/:id': ${error}`)
            //response.status(400).send({error:'malformed id'}) //Get request where Id provided does not conform to MongoDB ID format
            return next(error); //pass to error handling middleware
        });
});

app.delete("/api/persons/:id", (request, response, next) => {
    console.log("Backend(Delete):received");
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            console.log("Backend(Delete):deleted");
            response.status(204).end();
        })
        .catch((error) => {
            return next(error); //pass to error handling middleware
        });

    const userId = Number(request.params.id);
    phoneBook = phoneBook.filter((contact) => contact.id !== userId);
});

app.put("/api/persons/:id", (request, response, next) => {
    console.log("Backend(Put/update):received");
    console.log(request.params.id);
    const body = request.body;
    const person = {
        name: body.name,
        phoneNumber: body.phoneNumber,
    };

    Person.findByIdAndUpdate(request.params.id, person, {
        new: true,
        runValidators: true,
    })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    if (!body.name || !body.phoneNumber) {
        response.status(400).json({ error: "Name or number field is missing" });
    } else if (phoneBook.find((contact) => contact.name === body.name)) {
        response.status(400).json({
            error: "Duplicate name is detected, please use other unique name",
        });
    } else {
        const newContact = new Person({
            name: body.name,
            phoneNumber: body.phoneNumber,
        });
        console.log("Backend(POST):received");
        newContact
            .save()
            .then((savedContact) => {
                console.log("Backend(POST):saved");
                response.json(savedContact);
            })
            .catch((error) => next(error));
    }
});

/*
const generateId = () =>{
	return Math.floor(Math.random() * 1000000)
}
*/

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
