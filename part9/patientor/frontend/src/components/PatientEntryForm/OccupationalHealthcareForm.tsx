import { useState } from "react";

const OccupationalHealthcareForm = () => {
    const [entryDate, setEntryDate] = useState("");

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td className="ui header">Date</td>
                        <td>
                            <input
                                onChange={(e) => {
                                    setEntryDate(e.target.value);
                                }}
                                value={entryDate}
                                type="date"
                                placeholder="YYYY-MM-DD"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default OccupationalHealthcareForm;
