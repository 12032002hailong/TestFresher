import { Button, Modal } from "react-bootstrap"
import { useState } from 'react';
import { postCreateUser } from "../services/UserServices";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';


const ModalEditUser = (props) => {

    const { handleClose, show, dataUserEdit } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = () => {

    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    console.log(">>>check props", dataUserEdit);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit A User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add-new">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input type="text" className="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleEditUser()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEditUser;