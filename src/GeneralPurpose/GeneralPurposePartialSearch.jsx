import React, { Component } from 'react'
import {AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import { Alert } from '@material-ui/lab'
import {Fab, TextField, Select, Button, Box} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import EngineRenderer from "./EngineSelection"
const querystring = require('querystring')


export default class UpperPortion extends Component{
    constructor(props){
        super(props);
        this.state={
            brand:'',
            product:'',
            channel:'',
            rowData:null,
            selectednodes:0,
            en:'',
            uwengine:'',
            updateData: [],
            c:0,
            columns : [
                { field: "brand", headerName:"Brand"},
                { field: "product", headerName: "Product"},
                { field: "channel", headerName: "Channel"  },
                
               { field: "engine", headerName: "UW Engine", cellRenderer:'engineRenderer',className:'c' ,cellRendererParams: { onEngineChange: this.onEngineChange}},
                {headerName: "Action", cellRendererFramework: (params)=><div>
                <Fab className="float" size="small" color="primary" aria-label="add" id ="a" onClick={this.OnButtonClick}>
            <SaveIcon />
        </Fab>
            </div>}
                
            ],
              
              defaultColDef: {
                flex: 1,
                minWidth: 130,
                editable: false,
                resizable: true,
              },
              gridOptions:{
                frameworkComponents: {
                    engineRenderer: EngineRenderer
                  },
                  onSelectionChanged:this.onSelectionChanged.bind(this)
              }
        }
    }
    search=()=>{
       let params ={
            "brand": this.state.brand,          
            "product":this.state.product ,     
            "channel": this.state.channel,  
            "engine": this.state.uwengine
        }       
        console.log('https://localhost:44358/api/Main/GetGeneralPurposePartial/?' + querystring.stringify(params))
        fetch('https://localhost:44358/api/Main/GetGeneralPurposePartial/?' + querystring.stringify(params)).then(res=>res.json()).then(rowData=>{this.setState({rowData}) 
            console.log(rowData)
        }).catch(err=>console.log(err))
    }

    onEngineChange = (engine) => {
        console.log("engine Change", engine)
        this.state.en=engine
        }

    onSelectionChanged=(event)=>{
        //console.log(event)
        console.log(event.api.getSelectedNodes())      
      }

    HandleChanges=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    /*BulkUpdate=()=>{
        const selectednodes = this.gridApi.getSelectedNodes()
        const selectedData = parseInt(selectednodes[0].id)
        const sel = selectednodes[0].data
        sel.engine = document.getElementsByClassName("cb")[selectedData].value
        this.state.updateData.push(sel)
    }*/

    OnButtonClick=()=>{
        const selectednodes = this.gridApi.getSelectedNodes()
        const sel = selectednodes[0].data
        sel.engine = this.state.en
        axios.put("https://localhost:44358/api/Main/UpdateGeneralPurposeRecords",{Brand: sel.brand, Channel: sel.channel, Engine: sel.engine,Product: sel.product}).then(res=> {console.log(res)
            if(res.data == true)
                alert("Data Updated")     
        })
    }
    /*UpdateRows=()=>{
        console.log("The type of Updated:"+typeof(this.state.updateData))
        axios.put("https://localhost:44358/api/Main/UpdateGeneralPurposeRecords", JSON.stringify(this.state.updateData)).then(res=>{
            console.log(res)
            this.state.updateData = []
    })

    }*/

    count=()=>{
        document.getElementById("saveall").innerHTML = "Save" + ++(this.state.c)
    }

    reset=()=>{
        this.setState({brand:""})
        this.setState({product:""})
        this.setState({channel: ""})
        this.setState({uwengine:""})
        this.setState({rowData:null})
    }
    
    sync=()=>{
        axios.get("https://localhost:44358/api/Main/SyncGeneralPurposeDB").then(res=>{
            if(res.data == true)
                alert("Databases Synchronised")
            else
                alert("Sync Exception: Databases already Synchronised or Synchronisation failed")
        })
    }
   
    render(){
        return(
            <div>
                <div>
                    <Button color="secondary" onClick={this.sync} variant="contained" style={{marginLeft:"91%", width:95 , height:50}}>Sync</Button>
                <Box display="flex" justifyContent="center" border={1}  m={2} borderColor="grey.500" borderRadius="borderRadius">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td><TextField placeholder="Enter Brand" name="brand" onChange={this.HandleChanges}  value = {this.state.brand}variant="outlined"/></td>
                                <td><TextField placeholder="Enter Product" name="product" onChange={this.HandleChanges} value = {this.state.product} variant="outlined"/></td>
                                <td><TextField placeholder="Enter Channel" name="channel" onChange={this.HandleChanges} value = {this.state.channel}  variant="outlined"/></td>
                                <td><Select
                                    variant="outlined"
                                    native
                                    value={this.state.uwengine}
                                    onChange={this.HandleChanges}
                                    label="UWEngine"
                                    inputProps={{
                                        name: 'uwengine',
                                        id: 'outlined-age-native-simple',
                                    }}
                                    >
                                    <option aria-label="None" value="">UWEngine</option>
                                    <option value="Interconnect">Interconnect</option>
                                    <option value="Powercurve">Powercurve</option>
                                    <option value="Smarts">Smarts</option>
                                    </Select></td>
                                <td><Button onClick={this.search} color="primary" variant="contained" style={{width: 95, height:50}}>Search</Button></td>
                                <td><Button onClick={this.reset} variant="contained" style={{width: 95, height:50}}>Reset</Button></td>
                               
                            </tr>
                        </tbody>
                    </table>
                    </Box>
                </div>
                <div className="ag-theme-balham"
                    style={{width:1363,
                    height:400}}
                >
                
                <AgGridReact
                    columnDefs = {this.state.columns}
                    defaultColDef={this.state.defaultColDef}
                    rowData={this.state.rowData}
                    rowSelection="single"
                    onGridReady={params=>this.gridApi = params.api}
                    rowHeight={55}
                    rowMultiSelectWithClick={true}
                    pagination={true}
                    paginationPageSize={6}
                    onSelectionChanged={this.onSelectionChanged}
                    gridOptions={this.state.gridOptions}
                />
                
                </div>
            </div>
        )
    }
}