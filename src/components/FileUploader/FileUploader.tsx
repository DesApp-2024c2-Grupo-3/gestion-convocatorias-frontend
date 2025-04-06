import React , { ChangeEvent, useState } from "react";
import styles from "D:/Documentos/gestion-convocatorias-frontend/src/pages/PerfilDeUsuario/miperfil.module.css"
import axios from "axios"
import { updateCv } from "../../api/api";
import { useRef } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error"

function FileUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState<UploadStatus>("idle")
    //const inputRef = useRef<HTMLInputElement | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    async function handleFileUpload(e: React.MouseEvent<HTMLButtonElement>) {
        if (!file) return;
        setStatus("uploading")
        const formData = new FormData();
        formData.append("archivo", file)

        try {
            setStatus("success");
            updateCv("pepito666@gmail.com", formData)
        } catch (e) {
            setStatus("error");
        };        
    }

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
        {!file && <p>El archivo debe estar en formato .pdf</p>}
        <input type="file" onChange={handleFileChange} />
        {file && (
        <div>
            <p>Peso: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
        )}
        {file && status !== "uploading" &&
        <button type="button" onClick={(handleFileUpload)}>Subir</button>
        }
        {status === 'success' && (
            <p>Archivo subido correctamente</p>
        )}
        {status === 'error' && (
            <p>Ocurrió un error al subir el archivo, por favor intentalo más tarde</p>
        )}

    </div>
    );
}

export default FileUploader