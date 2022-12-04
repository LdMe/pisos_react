import { getProvinces, getBins, getDates, getPrices2, getGraph} from "../api/prices";
import {getPrices} from "../actions/prices";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Modal}  from 'react-bootstrap';

import Option from "./Selector/Option";
import MultiSelector from "./Selector/MultiSelector";
import Prices from "./Prices/Prices";
import Graphics from "./Graphics/Graphics";
import "./styles.css";


const Home = () => {
    const [modal, setModal] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [bins, setBins] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dates, setDates] = useState([]);
    const [prices, setPrices] = useState([]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [selectedProvinces, setSelectedProvinces] = useState([]);
    const type ={piso: "Piso", casa: "Casa", apartamento: "apartamento", ático: "ático", dúplex: "dúplex", estudio: "estudio", loft: "loft", finca: "finca"};
    const [houseAttributes, setHouseAttributes] = useState({surface: 0, bedrooms: 1, restrooms: 1, floor: 0, elevator: false, terrace: false, type: "piso", rent: 1,provinces:["Albacete"], dates: ["7/2022"]});
    const dispatch = useDispatch();
    //const prices = useSelector((state) => state.prices);

    const handleChange = (event) => {
        setHouseAttributes({ ...houseAttributes, [event.target.name]: event.target.value });
    };
    const handleChangeMulti = (name,data) => {
        setHouseAttributes({ ...houseAttributes, [name]: data });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setModal(false);
        //console.log(houseAttributes);
        savePrices();
        //dispatch(getPrices(houseAttributes));
        
        
    };
    const savePrices = async () => {
        console.log("precios anteriores ",prices)
        const response = await getPrices2(houseAttributes);
            
            setPrices(response.data);
            console.log("prices",prices);
            //dispatch({ type: 'FETCH_ALL', payload: response.data });   
        
    };
    useEffect(() => {
        const fetchProvinces = async () => {
            const provinces = await getProvinces();
            setProvinces(provinces.provinces);
            
        };
        const fetchBins = async () => {
            const bins = await getBins();
            setBins(bins.bins);
            setLabels(bins.labels);
        };
        const fetchDates = async () => {
            const dates = await getDates();
            let formattedDates = dates.dates.map((date) => {
                return date[0]+"/"+date[1]
            });
            setDates(formattedDates);
        };

        fetchProvinces();
        fetchBins();
        fetchDates();
        
    }, []);
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => setModal(true)}>Open Modal</button>
            <Modal show={modal} onHide={() => setModal(false)}>
                <div className="row">
                    <div className="col">
                        <label>Surface</label>
                        <select name="surface" value={houseAttributes.surface} onChange={handleChange}>
                            {labels.map((label,index) => (
                                <option key={index} value={bins[index]}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <label>Bedrooms</label>
                        <input name="bedrooms" type="number" min="1" max="10" value={houseAttributes.bedrooms} onChange={handleChange} />
                    </div>
                    <div className="col">
                        <label>restrooms</label>
                        <input name="restrooms" type="number" min="1" max="10" value={houseAttributes.restrooms} onChange={handleChange}/>
                    </div>
                </div>
                <div className="row">
                <div className="col">
                    <label>Floor</label>
                    <input name="floor" type="number" min="0" max="10" value={houseAttributes.floor} onChange={handleChange} />
                </div>
                <div className="col">
                    <label>Elevator</label>
                    <input type="checkbox" name="elevator" onChange={handleChange}/>
                </div>
                <div className="col">
                    <label>Terrace</label>
                    <input type="checkbox" name="terrace" onChange={handleChange}/>
                </div>
                <div className="col">
                    <label>Type</label>
                    <select name="type" value={houseAttributes.type} onChange={handleChange}>
                        {Object.keys(type).map((key,index) => (
                            <option key={index} value={key}>
                                {type[key]}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
                <div className="row">
                    <div className="col">
                        <select name="rent" value={houseAttributes.rent} onChange={handleChange}>
                            <option value="1">Rent</option>
                            <option value="0">Sale</option>
                        </select>
                    </div>
                    
                    <div className="col">
                        <MultiSelector name="dates" options={dates} selected ={houseAttributes.dates} onChange={handleChangeMulti}/>
                    </div>
                    <div className="col">
                        <MultiSelector name="provinces" options={provinces}  selected ={houseAttributes.provinces} onChange={handleChangeMulti}/>
                    </div>
                    <div className="col">
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </Modal>            
            {prices.length!= 0 ? 
            <div>
            <Prices prices={prices}/>
            <Graphics data={prices} uri="bars"/>
            <Graphics data={prices} uri="graph"/>
            </div>
            : null}
        </div>
    );
};

export default Home;
