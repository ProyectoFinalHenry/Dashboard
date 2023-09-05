import NavigationBar from '../../components/NavBar/NavigationBar.jsx';
import SalesChart from '../../components/Charts/Sales/SalesChart.jsx';
import UsersChart from '../../components/Charts/Users/UsersChart.jsx';
import CategoriesChart from '../../components/Charts/Categories/CategoriesChart.jsx';
import ProductsStock from '../../components/Charts/Products/ProductsStock.jsx';
import BreadCum from '../../components/BreadCum/BreadCum.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [salesCategories, setSalesCategories] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [categoriesLabels, setCategoriesLabels] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [usersCategories, setUsersCategories] = useState([]);
    const [coffeesData, setCoffeesData] = useState([]);
    const breadcumItems = [
        'Panel',
    ];
    useEffect(() => {
        getChartsData();
    }, []);
    const getChartsData = async () => {
        try {
            const response = await axios.get("management/data");
            const { salesData } = response.data;
            const { typesData } = response.data;
            const { usersData } = response.data;
            const { coffeesData } = response.data;
            const { categories, data } = salesData;
            const { labels, series } = typesData;
            const usersCategories = usersData.categories;
            const registeredUsersData = usersData.data;
            setSalesData(data);
            setSalesCategories(categories);
            setCategoryData(series);
            setCategoriesLabels(labels);
            setUsersData(registeredUsersData);
            setUsersCategories(usersCategories);
            setCoffeesData(coffeesData);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>
            <NavigationBar />
            <BreadCum items={breadcumItems} />
            <div className='chart-cont'>
                <UsersChart
                    usersData={usersData}
                    usersCategories={usersCategories}
                />
                <CategoriesChart
                    categoriesData={categoryData}
                    categoriesLabels={categoriesLabels}
                />

            </div>
            <div className='chart-cont'>
                <SalesChart
                    salesData={salesData}
                    salesCategories={salesCategories}
                />
                <ProductsStock
                    coffeesData={coffeesData}
                />
            </div>
        </div>
    )
}

export default Dashboard;