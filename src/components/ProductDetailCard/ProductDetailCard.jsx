import React from "react";
import { Card, CardHeader, CardBody, Image, Divider } from "@nextui-org/react";
import { FaStar } from 'react-icons/fa';
import './ProductDetailCard.css'

export default function ProductDetailCard({ detailData }) {
    const {
        name,
        image,
        stock,
        isActive,
        description,
        price,
        Origin,
        TypeOfCoffee,
        RoastingProfile,

    } = detailData;
    return (
        <Card className="detail-products-card">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{name}</p>
                <small className="text-default-500">stock: {stock}</small>
                <div className="detail-starts-icons font-bold text-large">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
                <Divider />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div>
                    <label className="font-bold uppercase text-large">Precio</label>
                    <p>$ &nbsp;{price}</p>
                </div>
                <div>
                    <label className="font-bold uppercase text-large">Descripción</label>
                    <p>{description}</p>
                </div>
                <div>
                    <label className="font-bold uppercase text-large">origen</label>
                    <p>{Origin?.origin}</p>
                </div>
                <div>
                    <label className="font-bold uppercase text-large">tipo de café</label>
                    <p>{TypeOfCoffee?.type}</p>
                </div>
                <div>
                    <label className="font-bold uppercase text-large">perfil de tostado</label>
                    <p>{RoastingProfile?.profile}</p>
                </div>
                <div>
                    <label className="font-bold uppercase text-large">Estatus</label>
                    <p>{
                        (isActive === true)
                            ? <span className="product-status-active">Activo</span>
                            : <span className="product-status-inactive">Inactivo</span>
                    }
                    </p>
                    <br />
                </div>
                <Divider />
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={image}
                    width={270}
                />
            </CardBody>
        </Card>
    );
}
