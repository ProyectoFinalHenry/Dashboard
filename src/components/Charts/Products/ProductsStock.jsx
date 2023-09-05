import Chart from 'react-apexcharts';
import { Card, CardBody } from "@nextui-org/react";
import './ProductsStock.css';

const ProductsStock = ({ coffeesData }) => {
    const { categories, data } = coffeesData;
    const state = {

        series: [{
            data: data
        }],
        options: {
            chart: {
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                    vertical: true
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: categories
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
                        width={625}
                        height={320}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default ProductsStock;