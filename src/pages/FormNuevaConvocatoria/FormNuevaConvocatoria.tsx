import React, { useContext } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import UserDropdown from "../../components/UserDropdropdown/UserDropdown";
import FormInformacionGeneral from "./FormPages/FormInformacionGeneral";

import styles from '../Home/home.module.css'
import { store } from "../../store/store";
import { selectStep } from "../../features/formularioNuevaConvocatoria/formularioSlice";
import { useSelector } from "react-redux";
import FormFormato from "./FormPages/FormFormato";
import BackButton from "./components/back-button/BackButton";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Login/userContext";

const FormNuevaConvocatoria = () => {
    const { usuario } = useContext(UserContext)

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    const step = useSelector(selectStep)

    return (
        <div className={styles['container-fluid']}>
            {/* row principal */}
            <div className={styles['row-principal']}>
                {/* col sidebar */}
                <div className={styles['col-sidebar']}>
                    <Sidebar />
                    
                </div>

                {/* col home */}
                <div className={styles['col-home']}>
                    <div className={styles['userDrop']}>
                        <UserDropdown />
                    </div>
                    <div>
                        <BackButton />
                    </div>
                    <div className={styles['convocatorias']}>
                        
                        {step === 1 && <FormInformacionGeneral />}
                        {step === 2  &&  <FormFormato />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormNuevaConvocatoria;
