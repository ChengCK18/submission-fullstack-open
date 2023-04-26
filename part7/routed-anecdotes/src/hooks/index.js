import { useState } from "react";



// import  { useField } from '../hooks'
// to import the custom hook below, dir depends where u put.
export const useField = (type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = (event) => {
        setValue('')
    }



    return {
        type: type,
        name: name,
        value: value,
        onChange: onChange,
        onReset: onReset,
    }

}


//Other hooks geos here