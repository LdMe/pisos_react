import {getGraph} from '../../api/prices.js';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const Graphics = ({data,uri}) => {

    const [graph, setGraph] = useState([]);

    useEffect(() => {
        try {
            const fetchGraph = async () => {
                console.log("data",data);
                const response = await getGraph(data,uri);
                setGraph(response.data);

                console.log("graph:" , response.data);
                }
            fetchGraph();
            console.log("uri",uri);

        } catch (error) {
            console.log(error.message);
        } 
    }, [data]);

    return (
        <div>
            <h1>Graphics</h1>
            <Plot data={graph.data} layout={graph.layout}  frames={graph.frames} />
        </div>
    )
}

export default Graphics;