
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "./Pagination/Pagination";
import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";

export default function TableShow(props) {
    const currentUser = props.currentUser || { name: "", };
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);

    const filteredDataByDate = date.length !== 0 ? props.data.filter(
        (item) => TransformDate(item.created_at) === date
    ) : props.data;

    const filterSearchByDate = date.length !== 0 ? filteredData.filter(
        (item) => TransformDate(item.created_at) === date
    ) : filteredData;

    console.log(filteredData);
    const showWichData = search.length > 0 ? filterSearchByDate : filteredDataByDate;

    // const start = (props.page - 1) * props.limit;
    // const end = Number(start) + Number(props.limit);
    // const final = props.data.slice(start, end);

    //Get Searched Data
    async function getSearchedData() {
        try {
            const res = await Axios.post(`${props.searchLink}/search?title=${search}`);
            setFilteredData(res.data);
        }
        catch (err) { console.log(err) }
        finally {
            setSearchLoading(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            search.length > 0 ? getSearchedData() : setSearchLoading(false);
        }, 500);
        return () => clearTimeout(debounce);
    }, [search])

    const j = useRef(0);

    //Header Show
    const headerShow = props.header.map((item, key) => <th key={key}>{item.name}</th>);
    //Body Show
    const dataShow = showWichData.map((item, key) => <tr key={key}>
        <td>{item.id}</td>
        {props.header.map((item2, key2) =>
            <td key={key2}>
                {item2.key === 'image'
                    ? <img width="50px" src={item[item2.key]} alt="" />
                    : item2.key === 'images' ? (
                        <div className="d-flex align-items-center justify-content-center gap-2 flex-wrap">
                            {item[item2.key].map((img) => (
                                <img width="50px" src={img.image} alt="" />
                            ))}
                        </div>
                    ) : item2.key === "created_at" || item2.key === "updated_at" ? (
                        (TransformDate(item[item2.key]))
                    )
                        : item[item2.key] === '1995'
                            ? 'admin'
                            : item[item2.key] === '2001'
                                ? 'user'
                                : item[item2.key] === '1996'
                                    ? 'writer'
                                    : item[item2.key] === '1999'
                                        ? 'Product Manger'
                                        : item[item2.key]}
                {currentUser && item[item2.key] === currentUser.name && " (You)"}
            </td>
        )}
        <td>
            <div className="d-flex align-items-center gap-2">
                <Link to={`${item.id}`}>
                    <FontAwesomeIcon fontSize={'19px'} icon={faPenToSquare} />
                </Link>
                {currentUser.name !== item.name && (
                    <FontAwesomeIcon
                        onClick={() => props.delete(item.id)}
                        cursor={'pointer'}
                        fontSize={'19px'} color="red"
                        icon={faTrash} />
                )}
            </div>
        </td>
    </tr>)
    //Return Data
    return (
        <>
            <div className="col-3">
                <Form.Control
                    className="my-2"
                    type="search"
                    aria-label="input example"
                    placeholder="search"
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setSearchLoading(true);
                    }}
                />
            </div>
            <div className="col-5">
                <Form.Control
                    className="my-2"
                    type="date"
                    aria-label="input example"
                    placeholder="search"
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        {headerShow}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.loading ? (
                        <tr className="text-center">
                            <td colSpan={12}>Loading...</td>
                        </tr>
                    ) : searchLoading ? (
                        <tr className="text-center">
                            <td colSpan={12}>Searching...</td>
                        </tr>
                    ) : dataShow.length === 0 ? (
                        <tr className="text-center">
                            <td colSpan={12}>No Results</td>
                        </tr>
                    ) : (dataShow)}

                </tbody>
            </Table>
            <div className="d-flex align-item-center justify-content-end flex-wrap">
                <div className="col-1">
                    <Form.Select onChange={(e) => props.setLimit(e.target.value)} aria-label='Default select example'>
                        <option value={"3"}>3</option>
                        <option value={"5"}>5</option>
                        <option value={"10"}>10</option>
                        <option value={"15"}>15</option>
                    </Form.Select>
                </div>
                <PaginatedItems
                    setPage={props.setPage}
                    itemsPerPage={props.limit}
                    data={props.data}
                    total={props.total}
                />
            </div>
        </>
    );
}
