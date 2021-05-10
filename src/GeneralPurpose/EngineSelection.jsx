import React, {useState} from 'react';
import {Select, Box} from '@material-ui/core'
//Testing-2
function EngineRenderer(props) {
    const[engine, setEngine] = useState(props.value);

    const onEngineChange = (event) => {
        props.onEngineChange(event.target.value);
        setEngine(event.target.value);
    }
    return(
        <div>
            <Box display="flex" justifyContent="center" border={1}  m={2} borderColor="grey.500" borderRadius="borderRadius">
                <Select value={engine} onChange={onEngineChange}>
                    <option value="Powercurve"> Powercurve </option>
                    <option value="Smarts"> Smarts </option>
                    <option value="Interconnect"> Interconnect </option>
                </Select>
            </Box>
        </div>

    )
}
  
export default EngineRenderer;