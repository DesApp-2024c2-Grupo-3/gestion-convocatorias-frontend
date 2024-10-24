import React from "react"
import Sidebar from "../../components/sidebar/sidebar"
import UserDropdown from "../../components/UserDropdropdown/UserDropdown"
import './formNuevaConvocatoria.css';
import FormInformacionGeneral from "./FormPages/FormInformacionGeneral";

const FormNuevaConvocatoria = () => {

    return (
        <div className='container-fluid d-flex'>
            {/* row principal */}
            <div className='row row-principal'>
                {/* col sidebar */}
                <div className='col col-sidebar'>
                    <Sidebar />
                </div>

                {/* col home */}
                <div className='col col-home'>
                    <div className='userDrop'>
                        <UserDropdown />
                    </div>

                    <div >
                        <>
                            <FormInformacionGeneral />
                        </>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default FormNuevaConvocatoria