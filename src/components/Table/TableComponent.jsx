import React, { useState } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue,
    Spinner
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import { notifySuccess } from "../../functions/toastify";
import { ToastContainer } from 'react-toastify';
import './Table.css';

const TableComponent = ({ columns, actions }) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch('https://backend-mniu.onrender.com/coffee', {
                signal,
            });
            let json = await res.json();
            setIsLoading(false);

            return {
                items: json,
            };
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(list.items.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return list.items.slice(start, end);
    }, [page, list.items]);

    const getIcon = (type) => {
        switch (type) {
            case "edit":
                return <FaPen />;
            case "detail":
                return <FaEye />;
            case "delete":
                return <FaTrash />;
        }
    }
    const handleRedirectDetail = (id) => {
        navigate(`detail/${id}`);
    }
    const handleRedirectEdit = (id) => {
        navigate(`update/${id}`);
    }

    const handleDeleteProduct = async (id, status) => {
        try {
            const auth_token = localStorage.getItem("auth_token")
            const { data } = await axios.put(`coffee/${id}`, {
                data: {
                    defaultCoffee: {
                        isActive: (status === true) ? false : true
                    }
                }
            }, { headers: { auth_token } });
            if (data.status === true) {
                const message = (status === true) ? 'Producto desactivado exitosamente' : 'Producto activado exitosamente';
                notifySuccess(message);
                setTimeout(() => {
                    window.location.href = '/products';
                }, 1 * 3000);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getRedirectFunction = (action, id, status) => {
        switch (action) {
            case "edit":
                return () => handleRedirectEdit(id);
            case "detail":
                return () => handleRedirectDetail(id);
            case "delete":
                return () => handleDeleteProduct(id, status);
        }
    }
    const getActionButtons = (id, status) => {
        return actions.map((action, i) => {
            return <Button
                isDisabled={(status === false && action === "edit") ? true : false}
                size="sm"
                className="action-buttons"
                key={i}
                onClick={getRedirectFunction(action, id, status)}>{getIcon(action)}</Button>
        });
    }
    const pagination = <div className="flex w-full justify-center">
        <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
        />
    </div>;
    return (
        <div className="table-products-cont">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Table
                aria-label="Example table with dynamic content"
                sortDescriptor={list.sortDescriptor}
                onSortChange={list.sort}
                bottomContent={pagination}
                classNames={{
                    wrapper: "min-h-[222px]",
                    table: "min-h-[400px]",
                }}>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key} allowsSorting>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody
                    items={items}
                    isLoading={isLoading}
                    loadingContent={<Spinner label="Loading..." />}
                >
                    {(item) => (
                        < TableRow key={item.id}>
                            {(columnKey) =>
                                <TableCell
                                    className={(columnKey === "actions") ? "actions-cont" : ''}
                                >
                                    {
                                        (columnKey === "actions") ? getActionButtons(item.id, item.isActive)
                                            : (columnKey === "isActive")
                                                ? (item.isActive === true)
                                                    ? <span className="product-status-active">{getKeyValue("activo", columnKey)}</span>
                                                    : <span className="product-status-inactive">{getKeyValue("inactivo", columnKey)}</span>
                                                : (columnKey === "image") ? <img src={item.image} /> : getKeyValue(item, columnKey)
                                    }
                                </TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
    )
    /*
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList({
        async load({ signal }) {
            let res = await fetch('https://backend-mniu.onrender.com/coffee', {
                signal,
            });
            let json = await res.json();
            setIsLoading(false);

            return {
                items: json,
            };
        },
        async sort({ items, sortDescriptor }) {
            return {
                items: items.sort((a, b) => {
                    let first = a[sortDescriptor.column];
                    let second = b[sortDescriptor.column];
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

                    if (sortDescriptor.direction === "descending") {
                        cmp *= -1;
                    }

                    return cmp;
                }),
            };
        },
    });

    return (
        <Table
            aria-label="Example table with client side sorting"
            sortDescriptor={list.sortDescriptor}
            onSortChange={list.sort}
            classNames={{
                table: "min-h-[400px]",
            }}
        >
            <TableHeader>
                <TableColumn key="name" allowsSorting>
                    Name
                </TableColumn>
                <TableColumn key="height" allowsSorting>
                    Height
                </TableColumn>
                <TableColumn key="mass" allowsSorting>
                    Mass
                </TableColumn>
                <TableColumn key="birth_year" allowsSorting>
                    Birth year
                </TableColumn>
            </TableHeader>
            <TableBody
                items={list.items}
                isLoading={isLoading}
                loadingContent={<Spinner label="Loading..." />}
            >
                {(item) => (
                    <TableRow key={item.name}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );*/
}

export default TableComponent;