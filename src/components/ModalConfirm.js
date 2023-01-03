import { Button, Modal } from "react-bootstrap"
import { deleteUser } from '../services/UserServices';
import { toast } from 'react-toastify';
const ModalConfirm = (props) => {

    const { handleClose, show, dataUserDelete, handleDeleteUserFromModal } = props;

    const confirmDelete = async () => {
        let res = deleteUser(dataUserDelete.id);
        if (res) {
            toast.success("Delete user succeed!");
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error("error delete user")
        }
        console.log(">>check res.status", res);
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add-new">
                    This action can't be undone!


                    Do want to delete this user?App
                    <br />
                    <b>email = {dataUserDelete.email}</b>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => confirmDelete()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm;