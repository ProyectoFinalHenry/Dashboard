import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../../components/NavBar/NavigationBar';
import ProductDetailCard from '../../../components/ProductDetailCard/ProductDetailCard';
import BreadCum from '../../../components/BreadCum/BreadCum';
import './ProductsDetail.css';
import { useParams } from 'react-router-dom';

const ProductsDetail = () => {
    const [productDetail, setProductDetail] = useState([]);
    const { id } = useParams();


    const getCoffeeDetail = async () => {
        try {
            const { data } = await axios.get(`coffee/${id}`);
            setProductDetail(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCoffeeDetail();
    }, []);

    const breadCumItems = [
        'Productos',
        'Detalle'
    ];

    return (
        <div>
            <NavigationBar />
            <BreadCum items={breadCumItems} />
            <ProductDetailCard detailData={productDetail} />
        </div>
    )
}

export default ProductsDetail;