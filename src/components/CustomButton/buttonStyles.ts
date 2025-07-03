import { Margin } from "@mui/icons-material";

export const btnAzulUnahur = {
    backgroundColor: "#06A3C9",
    margin: "2em 0.5em",
    "&:hover": {
        backgroundColor: "#048AAE", // otro tono más oscuro, por ejemplo
    },
};

export const btnVerdeUnahur = {
    backgroundColor: "#56A42C",
    margin: "2em 0.5em",
    "&:hover": {
        backgroundColor: "#417c21",
    },
};

export const btnRojo = {
    backgroundColor: "#a22c29"
}

export const formNavSiguienteBtn = {
    ...btnVerdeUnahur,
    minWidth: '100px',
    width: '40%'
};

export const formNavAnteriorBtn = {
    ...btnAzulUnahur,
    minWidth: '100px',
    width: '40%'
};

export const formatSelectorBtn = {
    width: "45%",
    margin: "1em"
};