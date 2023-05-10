import Select from "react-select";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR_BIRTHYEAR } from "../queries";

const AuthorBirthYear = ({ authors }) => {
    const [options, setOptions] = useState("");
    const [setBornTo, setSetBornTo] = useState("");

    const [changeAuthorBirthyear, result] = useMutation(EDIT_AUTHOR_BIRTHYEAR, {
        onError: (error) => {
            // console.log("Error => ", error.message);
        },
    });

    const submit = (event) => {
        event.preventDefault();
        changeAuthorBirthyear({
            variables: { name: options.value, setBornTo },
        });
        setSetBornTo("");
    };

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            // console.log("Author not found");
        } else {
            // console.log(result);
        }
    }, [result.data]);

    let selectOptions = authors.map((auth) => {
        return {
            value: auth.name,
            label: auth.name,
        };
    });

    return (
        <form onSubmit={submit}>
            <h2>Set Birthyear</h2>

            <div>
                Name
                <div>
                    <Select
                        defaultValue={options}
                        onChange={setOptions}
                        options={selectOptions}
                    />
                </div>
                <br />
            </div>
            <div>
                Born
                <input
                    type="number"
                    value={setBornTo}
                    onChange={({ target }) =>
                        setSetBornTo(parseInt(target.value))
                    }
                />
            </div>
            <button type="submit">Update Author</button>
        </form>
    );
};

export default AuthorBirthYear;
