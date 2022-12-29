import { Button, Modal } from "react-bootstrap"
import { useState } from 'react';


const ModalAddNew = (props) => {

    const { handleClose, show } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");


    const handleSaveuser = () => {
        console.log(">>>check state :", name, job);
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
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
                <Button variant="primary" onClick={() => handleSaveuser()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddNew;