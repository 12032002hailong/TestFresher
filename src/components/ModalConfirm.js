import { Button, Modal } from "react-bootstrap"
import App from './../App';

const ModalConfirm = (props) => {

    const { handleClose, show, dataUserDelete } = props;

    const confirmDelete = () => {

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
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirm;