import Chart from 'react-apexcharts';
import { Card, CardBody } from "@nextui-org/react";
import './ProductsStock.css';

const ProductsStock = () => {
    const state = {

        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                    'United States', 'China', 'Germany'
                ],
            }
        },


    };
    return (
        <div className='prodStock-chart-cont'>
            <Card>
                <CardBody>
                    <h1><strong>Stock de Productos</strong></h1>
                    <Chart
                        className='prodStock-chart'
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

export default ProductsStock;