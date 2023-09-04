import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/Table/TableComponent";
import axios from 'axios';
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../../components/NavBar/NavigationBar.jsx'
import './ProductsList.css';
import BreadCum from "../../../components/BreadCum/BreadCum";

const ProductsList = () => {

    const [product, setProducts] = useState([]);
    const navigate = useNavigate();

    async function getProducts() {
        const { data } = await axios.get("coffee/");
        setProducts(data)
    }
    useEffect(() => {
        getProducts()
    }, []);
    const actions = [
        'edit',
        'detail',
        'delete'
    ]
    const columns = [
        {
            key: "name",
            label: "NOMBRE",
        },
        {
            key: "description",
            label: "DESCRIPCIÓN",
        },
        {
            key: "price",
            label: "PRECIO",
        },
        {
            key: "stock",
            label: "STOCK",
        },
        {
            key: "actions",
            label: "ACCIONES",
        },
    ];
    const handleCreateProduct = () => {
        navigate("/products/create");
    }
    return (
        <div>
            <NavigationBar />
            <BreadCum />
            <h1>List of Products</h1>
            <div>
                <Button
                    size="sm"
                    className="create-button-list"
                    onClick={handleCreateProduct}><FaPlus /></Button>
            </div>
            <TableComponent columns={columns} actions={actions} data={product} />
        </div >
    )
}

export default ProductsList;