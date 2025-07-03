import React, { ChangeEvent, useContext, useState } from "react";
import axios from "axios"
import { downloadCv, updateCv } from "../../api/usuarios.api";
import { useRef } from "react";
import { UserContext } from "@/contexts/userContext";
import stylesButton from "./CvUploader.module.css"
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { CustomButton } from "../CustomButton/CustomButtons";
import { Button, IconButton, Typography } from "@mui/material";
import "./CvUploader.css"
import { styled } from "@mui/material";
import { CloudUploadIcon } from "lucide-react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { btnAzulUnahur, btnVerdeUnahur } from "../CustomButton/buttonStyles";

type UploadStatus = "idle" | "uploading" | "success" | "error"

type TokenPayload = {
    cvId: string,
    cvNombre: string,
    cvTipo: string,
}

function CvUploader() {
    const { usuario } = useContext(UserContext)
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>("idle")

    const token = sessionStorage.getItem("token")
    const decoded = jwtDecode<TokenPayload>(token as string)

    const [fileName, setFileName] = useState<string>(decoded.cvNombre || usuario?.cv?.nombre || "")

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    async function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
        if (!file || !usuario) return;
        setStatus("uploading")
        const formData = new FormData();
        formData.append("archivo", file)

        try {
            await updateCv(usuario.email, formData)
            setStatus("success");
            toast.success("Currículum subido correctamente")
            const token = sessionStorage.getItem("token")
            const decoded = jwtDecode<TokenPayload>(token as string)
            setFileName(decoded.cvNombre)
            setFile(null)
        } catch (e) {
            setStatus("error");
            toast.error("Ocurrió un error al cargar el currículum. Intente de nuevo más tarde")
        };
    }

    const descargarCV = async (userId: number) => {
        try {
            const blob = await downloadCv(userId);
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error al descargar el CV: ", error);
            toast.error("Ocurrió un error al descargar el currículum. Intente de nuevo más tarde")
        }
    };

    /*
    async function handlefileRemoval(e: React.MouseEvent<HTMLButtonElement>) {
        if (!usuario || usuario.cv) return;
        setStatus("uploading")
        //const formData = new FormData();
        //formData.append("archivo", file)

        try {
            setStatus("idle");
            usuario.cv = null
        } catch (e) {
            setStatus("error");
        };        
    } */

    /*function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
        const selectedFile = inputRef.current?.files?.[0];
        if (!selectedFile) return;
    
        setStatus("uploading");
    
        const formData = new FormData();
        console.log(selectedFile)
        formData.append("archivo", selectedFile);
    
        try {
            setStatus("success");
            updateCv("pepito666@gmail.com", formData);
        } catch (e) {
            setStatus("error");
        }
    }*/

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", gap: '0.3rem' }}>
                <svg style={{ color: 'red' }} xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-file-pdf" viewBox="0 0 16 16">
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
                    <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z" />
                </svg>
                <p style={{ margin: '0' }}>
                    {fileName || "Aún no tiene un CV cargado"}
                </p>
                {usuario?.cv?.nombre &&
                    <IconButton onClick={() => descargarCV(usuario._id)} sx={{ width: 32, height: 32, padding: 0, color: "black", cursor: 'pointer', display: 'flex' }}>
                        <FileDownloadIcon></FileDownloadIcon>
                    </IconButton>}
            </div>
            <div className="cv-select">
                <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
                {file && (
                    <div>
                        <p>Peso: {(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}
            </div>
            {file && status !== "uploading" &&
                <Button
                    onClick={(handleFileUpload)}
                    style={{ ...btnVerdeUnahur, margin: 0, color: "white" }}
                    startIcon={<CloudUploadIcon />}
                >
                    Subir
                </Button>
            }

        </>)
}

export default CvUploader