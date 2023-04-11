import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import "./index.css";
import contactService from "./services/contact";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNum, setNewNum] = useState("");
    const [newSearchName, setNewSearchName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        contactService.getAllContact().then((contacts) => {
            setPersons(contacts);
        });
    }, []);

    //For search field result
    //use regular expression
    let re = new RegExp(newSearchName, "i");
    const listResult =
        newSearchName === ""
            ? persons
            : persons.filter((person) => person.name.match(re));

    const newNameVal = (event) => {
        setNewName(event.target.value);
    };
    const newNumberVal = (event) => {
        setNewNum(event.target.value);
    };
    const newSearchNameVal = (event) => {
        setNewSearchName(event.target.value);
    };

    const handleDeleteContact = (person) => {
        if (window.confirm(`Remove ${person.name} from list of contacts?`)) {
            contactService
                .deleteContact(person.id)
                .then(() => {
                    setPersons(
                        persons.filter((contact) => contact.id !== person.id)
                    );
                })
                .catch((error) => {
                    alert(`This contact has already been deleted from server`);
                    setPersons(
                        persons.filter((contact) => contact.id !== person.id)
                    );
                });
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const nameExisted = (person) => person.name === newName;

        if (persons.some(nameExisted)) {
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                const existingContact = persons.find((n) => n.name === newName);
                const updatedExistingContact = {
                    ...existingContact,
                    number: newNum,
                };
                contactService
                    .updateContact(updatedExistingContact)
                    .then((response) => {
                        setPersons(
                            persons.map((person) =>
                                person.name !== response.name
                                    ? person
                                    : updatedExistingContact
                            )
                        );
                        setErrorMessage(`Contact successfully updated`);
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    })
                    .catch((error) => {
                        setErrorMessage(
                            `Error: Information of ${newName} has already been removed from server`
                        );
                        setTimeout(() => {
                            setErrorMessage(null);
                        }, 5000);
                    });
            }
        } else {
            if (newNum === "") {
                alert(`Please give ${newName} a phone number :)`);
            } else {
                const newPerson = {
                    name: newName,
                    number: newNum,
                    id:
                        persons.length !== 0
                            ? persons[persons.length - 1].id + 1
                            : 1,
                };

                contactService.addContact(newPerson).then((contact) => {
                    setErrorMessage(
                        `${contact.name}'s contact added successfully`
                    );
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000);
                });

                setPersons(persons.concat(newPerson));
                setNewName("");
                setNewNum("");
            }
        }
    };
    //console.log(listResult)

    return (
        <div>
            <h2>Phonebook ☎📖</h2>
            <Notification message={errorMessage} />
            <Filter
                newSearchNameVal={newSearchNameVal}
                newSearchName={newSearchName}
            />

            <h2>Add New Contact in PhoneBook 📖</h2>
            <PersonForm
                onSubmit={onSubmit}
                newNameVal={newNameVal}
                newName={newName}
                newNumberVal={newNumberVal}
                newNum={newNum}
            />

            <h2>Numbers ☎</h2>
            <ul>
                {listResult.map((person) => (
                    <li key={person.id}>
                        <Persons
                            name={person.name}
                            number={person.number}
                            buttonId={person.id}
                            handleDeleteContact={() =>
                                handleDeleteContact(person)
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
