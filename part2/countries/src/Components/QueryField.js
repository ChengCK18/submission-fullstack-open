import React from "react";

const QueryField = ({ handleCountryNameChange, countryName }) => {
    return (
        <div>
            Find Countries{" "}
            <input
                onChange={handleCountryNameChange}
                value={countryName}
            ></input>
        </div>
    );
};

export default QueryField;
