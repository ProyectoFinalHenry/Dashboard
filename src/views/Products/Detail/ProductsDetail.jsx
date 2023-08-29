import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '../../../components/NavBar/NavigationBar';
import ProductDetailCard from '../../../components/ProductDetailCard/ProductDetailCard';
import './ProductsDetail.css';
import { useParams } from 'react-router-dom';

const ProductsDetail = () => {
    const [productDetail, setProductDetail] = useState([]);
    const { id } = useParams();


    const getCoffeeDetail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/coffee/${id}`);
            setProductDetail(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCoffeeDetail();
    }, []);

    return (
        <div>
            <NavigationBar />
            <h1>Details View</h1>
            <ProductDetailCard detailData={productDetail} />
        </div>
    )
}

export default ProductsDetail;