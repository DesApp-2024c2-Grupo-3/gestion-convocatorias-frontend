import React, { ChangeEvent, useContext, useState } from "react";
import axios from "axios"
import { downloadCv, updateCv } from "../../api/usuarios.api";
import { useRef } from "react";
import { UserContext } from "../../pages/Login/userContext";
import stylesButton from "./CvUploader.module.css"
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";
import { CustomButton } from "../CustomButton/CustomButtons";
import { Button } from "react-bootstrap";
import "./CvUploader.css"

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
        <div>
            <p>
            {fileName}
            </p>
            {usuario?.cv?.nombre &&
                <div style={{marginBottom: "15px"}}>
                    <div onClick={() => descargarCV(usuario._id)} style={{ cursor: 'pointer', display: 'inline-block' }}>
                        <svg style={{ width: "20px", marginLeft: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <g data-name="35-Arrow Down">
                                <path d="M25 14h-5v2h5a5 5 0 0 1 5 5v4a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5v-4a5 5 0 0 1 5-5h5v-2H7a7 7 0 0 0-7 7v4a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7v-4a7 7 0 0 0-7-7z" />
                                <path d="m8.29 18.71 7 7a1 1 0 0 0 1.41 0l7-7-1.41-1.41L17 22.59V1h-2v21.59l-5.29-5.3z" />
                            </g>
                        </svg>
                    </div>


                </div>}
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
                    onClick={(handleFileUpload)}>
                    Subir
                </Button>
            }

        </div>)
}

export default CvUploader