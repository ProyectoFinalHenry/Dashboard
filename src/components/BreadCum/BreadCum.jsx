import React from "react";
import { TbSlash } from "react-icons/tb";
import './BreadCum.css';
import { useEffect } from "react";

const BreadCum = ({ items }) => {

    return (
        <div className='page-breadcum-cont'>
            <ol className='page-breadcum'>
                <li>Grano de Oro</li>
                {items.map((item) => {
                    return <span
                        style={{ display: 'inline-flex' }}>
                        <TbSlash />
                        <li>{item}</li>
                    </span>
                })}

            </ol>
        </div>
    )
}

export default BreadCum;