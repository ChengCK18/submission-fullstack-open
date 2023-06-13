import { HealthCheckEntry } from "../../types";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import Box from "@mui/material/Box";

interface EntryHealthCheckProps {
    entry: HealthCheckEntry;
}

const EntryHealthCheck: React.FC<EntryHealthCheckProps> = (props) => {
    const entry = props.entry;
    let healthRatingHeart = [];
    let healthRatingEmptyHeart = [];

    for (let x = entry.healthCheckRating % 4; x < 4; x++) {
        healthRatingHeart.push(<FavoriteSharpIcon style={{ fill: "red" }} />);
    }
    for (let x = 0; x < 4 - healthRatingHeart.length; x++) {
        healthRatingEmptyHeart.push(
            <FavoriteBorderSharpIcon style={{ color: "red" }} />
        );
    }

    return (
        <Box
            sx={{
                border: 2,
                borderColor: "black",
                borderRadius: "10px",
                padding: "10px",
                margin: "10px",
            }}
        >
            <MedicalInformationIcon />
            <h3>{entry.date}</h3>
            <div>{entry.description}</div>
            <br />
            <div>
                {healthRatingHeart.map((health) => health)}
                {healthRatingEmptyHeart.map((health) => health)}
            </div>
            <div>Diagnosed by: {entry.specialist}</div>
        </Box>
    );
};

export default EntryHealthCheck;
