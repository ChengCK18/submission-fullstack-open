import React from "react";
import Country from "./Country";

const QueryResult = ({ listResult, handleCountryNameChange }) => {
    let showSpecific = false;

    if (listResult.length > 10) {
        showSpecific = false;
        return <>Too many matches, please be more specific</>;
    } else if (listResult.length > 1) {
        console.log(listResult);
        showSpecific = false;
        return (
            <div>
                {listResult.map((country) => (
                    <Country
                        key={country.name.common}
                        country={country}
                        showSpecific={showSpecific}
                        handleCountryNameChange={handleCountryNameChange}
                    />
                ))}
            </div>
        );
    } else {
        if (typeof listResult[0] != "undefined") {
            showSpecific = true;
            return (
                <div>
                    <Country
                        key={listResult[0].name.common}
                        country={listResult[0]}
                        showSpecific={showSpecific}
                        handleCountryNameChange={handleCountryNameChange}
                    />
                </div>
            );
        } else {
            return <></>;
        }
    }
};

export default QueryResult;
