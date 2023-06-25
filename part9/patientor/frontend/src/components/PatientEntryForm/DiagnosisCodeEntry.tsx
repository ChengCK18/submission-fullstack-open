import { Dispatch, SetStateAction } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Diagnoses } from "../../types";

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface DiagnosisCodeMultipleSelectProps {
    diagnosisCodes: Diagnoses[];
    entryDiagnosisCode: string[];
    setEntryDiagnosisCode: Dispatch<SetStateAction<string[]>>;
}

const DiagnosisCodeMultipleSelect = (
    props: DiagnosisCodeMultipleSelectProps
) => {
    const handleChange = (
        event: SelectChangeEvent<typeof props.entryDiagnosisCode>
    ) => {
        const {
            target: { value },
        } = event;
        props.setEntryDiagnosisCode(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div>
            <FormControl sx={{ mt: 1, width: 300 }}>
                <InputLabel>Diagnosis Code</InputLabel>
                <Select
                    multiple
                    value={props.entryDiagnosisCode}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {props.diagnosisCodes.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                            {item.code}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DiagnosisCodeMultipleSelect;
