import NavigationBar from '../../components/NavBar/NavigationBar.jsx';
import TestChart from '../../components/Charts/TestChart.jsx';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div>
            <NavigationBar />
            <h1>Dashboard view</h1>
            {/**test chart */}
            <div>
                <TestChart />
            </div>
        </div>
    )
}

export default Dashboard;