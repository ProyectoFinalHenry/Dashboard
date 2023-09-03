import Chart from 'react-apexcharts';
import { Card, CardBody } from "@nextui-org/react";
import './CategoriesChart.css';
const CategoriesChart = () => {

    const state = {

        series: [44, 55, 41, 17, 15],
        options: {
            chart: {
                type: 'donut',
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };

    return (
        <div className='categories-chart-cont'>
            <Card>
                <CardBody>
                    <h1><strong>Categorias</strong></h1>
                    <Chart
                        className='categories-chart'
                        options={state.options}
                        series={state.series}
                        type="donut"
                        width={350}
                        height={250}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default CategoriesChart;