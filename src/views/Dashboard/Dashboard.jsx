import NavigationBar from '../../components/NavBar/NavigationBar.jsx';
import SalesChart from '../../components/Charts/Sales/SalesChart.jsx';
import UsersChart from '../../components/Charts/Users/UsersChart.jsx';
import CategoriesChart from '../../components/Charts/Categories/CategoriesChart.jsx';
import ProductsStock from '../../components/Charts/Products/ProductsStock.jsx';
import BreadCum from '../../components/BreadCum/BreadCum.jsx';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <NavigationBar />
            <BreadCum />
            {/**test chart */}
            <div className='chart-first-cont'>
                <UsersChart />
                <CategoriesChart />
                <ProductsStock />
            </div>
            <div>
                <SalesChart />
            </div>
        </div>
    )
}

export default Dashboard;