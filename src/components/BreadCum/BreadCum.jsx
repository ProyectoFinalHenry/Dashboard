import React from "react";
import { TbSlash } from "react-icons/tb";
import './BreadCum.css';
import { useEffect } from "react";

const BreadCum = ({ items }) => {

    return (
        <div className='page-breadcum-cont'>
            <ol className='page-breadcum'>
                <li>Grano de Oro</li>
                {items.map((item, i) => {
                    return <span
                        style={{ display: 'inline-flex' }}
                        key={i}>
                        <TbSlash />
                        <li>{item}</li>
                    </span>
                })}

            </ol>
        </div>
    )
}

export default BreadCum;