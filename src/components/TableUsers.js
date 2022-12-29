import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {

    const [listUsers, setlistUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        // code
        getUsers(1);
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setlistUsers(res.data);
            setTotalUsers(res.total);
            setTotalPages(res.total_pages);
        }
    }
    const handlePageClick = (event) => {
        console.log(">>> check events:", event);
        getUsers(+event.selected + 1);
    }

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
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
}
export default TableUsers;