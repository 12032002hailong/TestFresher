import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";

const TableUsers = (props) => {

    const [listUsers, setlistUsers] = useState([]);
    useEffect(() => {
        // code
        getUsers();
    }, [])

    const getUsers = async () => {
        let res = await fetchAllUser();
        if (res && res.data && res.data.data) {
            setlistUsers(res.data.data)
        }
    }

    // avatar
    // :
    // "https://reqres.in/img/faces/7-image.jpg"
    // email
    // :
    // "michael.lawson@reqres.in"
    // first_name
    // :
    // "Michael"
    // id
    // :
    // 7
    // last_name
    // :
    // "Lawson"

    console.log(">>> check listUserss", listUsers);
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.first_name}</td>
                                <td>{item.last_name}</td>
                                <td>{item.email}</td>
                            </tr>
                        )

                    })}

                </tbody>
            </Table>
        </div>
    )
}
export default TableUsers;