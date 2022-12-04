import { useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronDown,faChevronUp } from '@fortawesome/free-solid-svg-icons';

import "./styles.css";

const Prices = (prices) => {
    const [show, setShow] = useState(true);
    console.log(prices.prices);
    return (
        <div  onClick={() => setShow(!show)}>
            <h2>Prices {show ? <FontAwesomeIcon icon={faChevronUp}/>:<FontAwesomeIcon icon={faChevronDown}/>}</h2>
            {show ? (
                <div className="show-prices">
                    <table onClick={(e) => e.stopPropagation()}>
                        <thead>
                            <tr>
                                <th>lower</th>
                                <th>middle</th>
                                <th>upper</th>
                                <th>date</th>
                                <th>location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices.prices.map((price,index) =>(
                                <tr key={index}>
                                    <td>{price.lower}</td>
                                    <td>{price.middle}</td>
                                    <td>{price.upper}</td>
                                    <td>{price.date}</td>
                                    <td>{price.location_name}</td>
                                </tr>
                            ))}
                        </tbody>

                    
                    </table>
                        
                </div>
            
            ) : null}
        </div>
    );
};

export default Prices;
