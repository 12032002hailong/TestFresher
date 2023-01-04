
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../services/UserServices";
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import './TableUsers.scss';
import { CSVLink, CSVDownload } from "react-csv";

const TableUsers = (props) => {

    const [listUsers, setlistUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState([]);

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState("asc");
    const [sortField, setSortField] = useState("id");

    // const [keyword, setkeyword] = useState("");
    const [dataExport, setDataExport] = useState([]);

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user) => {
        setlistUsers([user, ...listUsers]);
    }
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(item => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setlistUsers(cloneListUsers);
    }

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

        getUsers(+event.selected + 1);
    }

    const handleEdituser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEdit(true);
    }

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true)
        setDataUserDelete(user)
    }

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
        setlistUsers(cloneListUsers);
    }

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField)
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
        setlistUsers(cloneListUsers);
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
            setlistUsers(cloneListUsers)
        } else {
            getUsers(1);
        }
    }, 300)

    const csvData = [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(["ID", "First name", "Last name", "Email"]);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.first_name;
                arr[2] = item.last_name;
                arr[3] = item.email;
                result.push(arr);
            })
            setDataExport(result);
            // done();
        }
    }
    return (<>
        <div className='my-3 add-new'>
            <span> <b>List Users :</b></span>
            <div className="group-btns">
                <label htmlFor="test" className="btn btn-warning">
                    <i className="fa-solid fa-file-import"></i> Import
                </label>
                <input id="test" type="file" hidden />
                <CSVLink
                    filename={"users.csv"}
                    className="btn btn-primary"
                    data={dataExport}
                    asyncOnclick={true}
                    onClick={getUsersExport}>
                    <i className="fa-solid fa-file-arrow-down"></i> Export</CSVLink>
                {/* <CSVDownload data={csvData} target="_black" /> */}

                <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>
                    <i className="fa-solid fa-plus"></i> Add new
                </button>
            </div>

        </div>
        <div className="col-4 my-3">
            <input className="form-control" placeholder="search user by email ..."

                // value={keyword}
                onChange={(event) => handleSearch(event)}
            />
        </div>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th >
                        <div className="sort-header">
                            <span>ID</span>
                            <span>
                                <i
                                    className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "id")}
                                ></i>

                                <i
                                    className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "id")}
                                ></i>
                            </span>
                        </div>


                    </th>
                    <th>
                        <div className="sort-header">
                            <span>First Name</span>
                            <span>
                                <i
                                    className="fa-solid fa-arrow-down-long"
                                    onClick={() => handleSort("desc", "first_name")}
                                ></i>
                                <i
                                    className="fa-solid fa-arrow-up-long"
                                    onClick={() => handleSort("asc", "first_name")}
                                ></i>
                            </span>
                        </div>

                    </th>
                    <th >Last Name</th>
                    <th >Email</th>
                    <th >Actions</th>
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
                            <td>
                                <button className="btn btn-warning mx-3"
                                    onClick={() => handleEdituser(item)}
                                >Edit</button>
                                <button className="btn btn-danger"
                                    onClick={() => handleDeleteUser(item)}
                                >Delete</button>
                            </td>
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
        <ModalAddNew
            show={isShowModalAddNew}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
        />
        <ModalEditUser
            show={isShowModalEdit}
            dataUserEdit={dataUserEdit}
            handleClose={handleClose}
            handleUpdateTable={handleUpdateTable}
            handleEditUserFromModal={handleEditUserFromModal}
        />
        <ModalConfirm
            show={isShowModalDelete}
            handleClose={handleClose}
            dataUserDelete={dataUserDelete}
            handleDeleteUserFromModal={handleDeleteUserFromModal}
        />
    </>
    )
}
export default TableUsers;