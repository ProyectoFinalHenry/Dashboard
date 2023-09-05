import React, { useEffect, useState } from "react";
import TableSales from "../../components/TableSales/TableSales";
import axios from 'axios';
import { Button } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import NavigationBar from "../../components/NavBar/NavigationBar";
import BreadCum from "../../components/BreadCum/BreadCum";
import './SalesList.css';

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();

    async function getSales() {
        const { data } = await axios.get("/order");
        setSales(data)
    }

    useEffect(() => {
        getSales();
    }, []);

    const breadCumItems = [
        'Ventas',
    ];

    const actions = []
    const columns = [
        {
            key: "date",
            label: "FECHA",
        },
        {
            key: "status",
            label: "ESTADO",
        },
        {
            key: "totalPrice",
            label: "MONTO",
        }
    ];

    return (
        <div>
            <NavigationBar />
            <BreadCum items={breadCumItems} />
            <TableSales columns={columns} actions={actions} data={sales} />
        </div>
    )
}

export default SalesList;

