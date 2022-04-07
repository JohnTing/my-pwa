import { Button, Modal } from "antd";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignoutModel() {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate()

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        getAuth().signOut().then(() => navigate("/"))
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            <Link to={"#"} onClick={showModal}>
                Sign Out
            </Link>
            <Modal title="登出" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskTransitionName="">
                <p>確定要登出嗎?</p>
            </Modal>
        </>
    );
};