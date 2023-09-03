import Chart from 'react-apexcharts';
import { Card, CardBody } from "@nextui-org/react";
import './UsersChart.css';
const UsersChart = () => {
    const state = {
        options: {
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [{
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
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
                        width={350}
                        height={205}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default UsersChart;