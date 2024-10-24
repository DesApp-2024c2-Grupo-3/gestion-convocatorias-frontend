import React from "react"
import Sidebar from "../../components/sidebar/sidebar"
import UserDropdown from "../../components/UserDropdropdown/UserDropdown"
import './formNuevaConvocatoria.css';
import FormInformacionGeneral from "./FormPages/FormInformacionGeneral";

const FormNuevaConvocatoria = () => {

    return (
        <div className='container-form'>
            {/* row principal */}
            <div className='row row-form'>
                {/* col sidebar */}
                <div className='col col-sidebar-form'>
                    <Sidebar />
                </div>

                {/* col home */}
                <div className='col col-home-form'>
                    <div className='userDrop'>
                        <UserDropdown />
                    </div>

                    <div className="col-form">
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