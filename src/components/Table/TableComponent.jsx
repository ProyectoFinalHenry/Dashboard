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
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { FaPen, FaEye, FaTrash, FaSearch } from "react-icons/fa";
import { notifySuccess, notifyInfo } from "../../functions/toastify";
import { ToastContainer } from 'react-toastify';
import './Table.css';

const TableComponent = ({ columns, actions }) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    let url = 'https://backend-mniu.onrender.com/coffee'
    let list;

    list = useAsyncList({
        async load({ signal }) {
            try {
                let res = await fetch(url, {
                    signal,
                });
                let json = await res.json();
                if (json.error) {
                    json = []
                }
                setIsLoading(false);
                return {
                    items: json,
                };

            } catch (error) {

            }
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

    const handleFilterStatus = (e) => {
        const { value } = e.target;
        // Definir los datos que deseas enviar en el cuerpo de la solicitud
        const params = {
            status: value,
        };
        // Convertir los parámetros en una cadena de consulta (query string)
        const queryParams = new URLSearchParams(params).toString();
        const updateUrl = `https://backend-mniu.onrender.com/coffee?${queryParams}`;
        url = updateUrl;
        list.reload();
    }
    const handleSearchChange = (e) => {
        const { value } = e.target;
        if (value !== '') {
            // Definir los datos que deseas enviar en el cuerpo de la solicitud
            const params = {
                name: value,
            };
            // Convertir los parámetros en una cadena de consulta (query string)
            const queryParams = new URLSearchParams(params).toString();
            const updateUrl = `https://backend-mniu.onrender.com/coffee?${queryParams}`;
            url = updateUrl;
        }
        list.reload();
    }
    const handleDeleteProduct = async (id, status) => {
        try {
            const auth_token = localStorage.getItem("auth_token")
            const { data } = await axios.put(`coffee / ${id}`, {
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
            <div className="filters-elements-cont">
                <span >
                    <Input
                        type="search"
                        size="sm"
                        label="Buscar"
                        placeholder="Introduce un nombre..."
                        labelPlacement="outside-left"
                        onChange={handleSearchChange}
                        startContent={
                            <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Select
                        size="sm"
                        label="Selecciona un estatus"
                        labelPlacement="outside-left"
                        placeholder="Estatus..."
                        onChange={handleFilterStatus}
                        className="max-w-xs"
                    >
                        <SelectItem key='true' value='true'>
                            activo
                        </SelectItem>
                        <SelectItem key='false' value='false'>
                            inactivo
                        </SelectItem>
                    </Select>
                </span>
            </div>
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

                {

                    (items.length < 1)
                        ? <TableBody
                            loadingContent={"No hay resultados..."}
                            isLoading={true}></TableBody>
                        : <TableBody
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
                }

            </Table>
        </div >
    )
   
}

export default TableComponent;