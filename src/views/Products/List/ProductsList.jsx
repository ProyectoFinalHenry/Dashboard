import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/Table/TableComponent";
import axios from 'axios';
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './ProductsList.css';

const ProductsList = () => {

    const [product, setProducts] = useState([]);
    const navigate = useNavigate();

    async function getProducts() {
        const { data } = await axios.get("http://localhost:3001/coffee/");
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
            label: "Nombre",
        },
        {
            key: "description",
            label: "DESCRIPCIÓN",
        },
        {
            key: "price",
            label: "PRICE",
        },
        {
            key: "stock",
            label: "STOCK",
        },
        {
            key: "actions",
            label: "ACTIONS",
        },
    ];
    const handleCreateProduct = () => {
        navigate("/products/create");
    }
    return (
        <div>
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