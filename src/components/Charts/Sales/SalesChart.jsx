import Chart from 'react-apexcharts';
import { Card, CardBody } from "@nextui-org/react";
import './SalesChart.css'
const SalesChart = ({ salesData, salesCategories }) => {
    const state = {
        series: [{
            name: "Desktops",
            data: salesData
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Monto de Ventas Por Mes',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: salesCategories,
            }
        },


    };

    return (
        <div className='sales-chart-cont'>
            <Card>
                <CardBody>
                    <h1><strong>Ventas</strong></h1>
                    <Chart
                        className='sales-chart'
                        options={state.options}
                        series={state.series}
                        type="line"
                        width={700}
                        height={320}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default SalesChart;