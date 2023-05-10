import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, notify, setPage, setUserInfo }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            notify(error.graphQLErrors[0].message);
        },
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            localStorage.setItem("user-token", token);

            setToken(token);
            setUserInfo(result.data.login.loggedInUser);
            setPage("authors");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.data]);

    const submit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
    };

    if (!show) {
        return null;
    }

    return (
        <div>
            <form onSubmit={submit}>
                <br />
                <div>
                    Username
                    <input
                        type="String"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>

                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
