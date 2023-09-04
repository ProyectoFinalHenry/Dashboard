import Chart from 'react-apexcharts';
import { Card, CardBody } from "@nextui-org/react";
import './UsersChart.css';
const UsersChart = ({ usersData, usersCategories }) => {
    const state = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: usersCategories
            }
        },
        series: [{
            name: 'Sep',
            data: usersData
        }]
    }
    return (
        <div className='users-chart-cont'>
            <Card>
                <CardBody>
                    <h1><strong>Usuarios</strong></h1>
                    <Chart
                        className='user-chart'
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width={700}
                        height={320}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default UsersChart;