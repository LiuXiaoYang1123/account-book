import React from "react";
import Ionicon from 'react-ionicons'
import '../App.css'
const CreateBtn = ({ onCreateBtn }) => {
    return (
        <>
            <a className="btn btn-primary create-button"
                style={{ width: '100%', size: "25px" }}
                onClick={(event => { event.preventDefault(); onCreateBtn() })}>
                <Ionicon
                    className="rounded-circle mr-2"
                    font-size="25px"
                    color={'#fff'}
                    icon='ios-add-circle'
                ></Ionicon>
                创建一条记录</a>
        </>
    )

}

export default CreateBtn