import React from "react";
import Ionicon from 'react-ionicons'
import '../App.css'
const CreateBtn = ({ onCreateBtn }) => {
    return (
        <>
            <button className="btn btn-primary create-button"
                style={{ width: '100%', size: "25px" }}
                onClick={onCreateBtn('create')}>
                <Ionicon
                    className="rounded-circle mr-2"
                    font-size="25px"
                    color={'#fff'}
                    icon='ios-add-circle'
                ></Ionicon>
                创建一条记录</button>
        </>
    )

}

export default CreateBtn