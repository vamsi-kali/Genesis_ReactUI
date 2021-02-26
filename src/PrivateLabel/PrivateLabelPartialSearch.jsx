import React, { Component } from 'react'
import {TextField, Select, Button,Fab, Box} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import 'bootstrap/dist/css/bootstrap.css'
import {AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import axios from 'axios';
import EngineRenderer from "../GeneralPurpose/EngineSelection"
const querystring = require('querystring')
export default class PrivateLabel extends Component{
    constructor(props){
        super(props)
        this.state={
            brandingcodeid:'',
            brandingcode:'',
            classification:'',
            organisation:'',
            orchestration:'',
            program:'',
            equifexprogramtype:'',
            adjudicationenginetype:'',
            uwengine:"",
            en:"",
            rowData:null,
            defaultColDef: {
                flex: 1,
                minWidth: 10,
                editable: false,
                resizable: true,
              },
            columnDefs:[
                {headerName:"BrandingCodeId", field:"brandingCodeId", width: 10 },
                {headerName: "BrandingCode", field: "brandingCode"},
                {headerName: "Classification", field: "classification"},
                {headerName: "Organisation", field: "organisation"},
                {headerName: "Orchestration", field: "orchestration"},
                {headerName: "Program", field: "program"},
                {headerName: "Equifexprogram", field: "equifexProgramType"},
                {headerName: "AdjudicationEngine", field: "adjudicationEngine"},
                {headerName: "UWEngine", field: "uwEngine",cellRenderer:'engineRenderer',className:'c' ,cellRendererParams: { onEngineChange: this.onEngineChange} },
                {headerName: "Action", cellRendererFramework: (params)=><div>
                <Fab className="float" size="small" color="primary" aria-label="add" onClick={this.OnButtonClick}>
            <SaveIcon />
        </Fab></div>}
            ],
            gridOptions:{
                frameworkComponents: {
                    engineRenderer: EngineRenderer
                  },
                  
              }
              
        }
    }

    OnButtonClick=()=>{
        const selectednodes = this.gridApi.getSelectedNodes()
        const sel = selectednodes[0].data
        sel.uwEngine = this.state.en
        console.log("the sel:"+(sel.uwEngine))
        axios.put("https://localhost:44358/api/Main/UpdatePrivateLabelRecords",{brandingCodeId:sel.brandingCodeId, brandingCode: sel.brandingCode, classification: sel.classification, organisation:sel.organisation, orchestration: sel.orchestration, adjudicationEngine: sel.adjudicationEngine, program: sel.program, uwEngine: sel.uwEngine, equifexProgramType: sel.equifexProgramType}).then(res=> {console.log(res)
        if(res.data == true)
            alert("Data is Updated")
    })
        //console.log(this.state.updateData)
        //console.log(this.gridApi.getRowNode(selectednodes).data)
    }

    onEngineChange = (engine) => {
        console.log("engine Change", engine)
        this.state.en=engine
       // document.getElementById("a").disabled=false;
          }

   

    onHandleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value })
    }

    RetriveRecords=()=>{
        let params={
            "brandingCodeId": this.state.brandcodeid,
            "brandingCode": this.state.brandcode,
            "classification": this.state.classification,
            "organisation": this.state.organisation,
            "orchestration": this.state.orchestration,
            "program": this.state.program,
            "equifexProgramType": this.state.equifexprogramtype,
            "adjudicationEngine": this.state.adjudicationengine,
            "uwEngine": this.state.uwengine
        }

       axios.get("https://localhost:44358/api/Main/GetPrivateLabelPartial?" + querystring.stringify(params)).then(res=> {
           console.log(res.data)
           this.setState({rowData:res.data})
        })
    }
    reset=()=>{
        this.setState({brandingcodeid:""})
        this.setState({brandingcode:""})
        this.setState({classification: ""})
        this.setState({uwengine:""})
        this.setState({orchestration:""})
        this.setState({organisation:""})
        this.setState({adjudicationenginetype:""})
        this.setState({equifexprogramtype:""})
        this.setState({program:""})
        this.setState({en:""})
        this.setState({rowData:null})

    }

    sync=()=>{
        axios.get("https://localhost:44358/api/Main/SyncPrivatePurposeDB").then(res=>{
            if(res.data == true)
                alert("Databases are Synced")
            else
                alert("Sync Exception: Databases are synced before or synchronisation failed")
        })
    }

    render(){
        return(
          <div>
                 <Button variant="contained" color="secondary" style={{display:'block',textTransform:'capitalize', marginLeft:"95%"}} size="large" onClick={this.sync}>Sync</Button>

               <Box display="inline-block" justifyContent="center" border={1}  m={2} borderColor="grey.500" borderRadius="borderRadius" style={{marginLeft:"6%"}}>
              <table style={{padding:9}}>
                  <tbody>
                      <tr>
                          <td><TextField name="brandingcodeid" placeholder="BrandCodeId" onChange={this.onHandleChange} variant="outlined" value={this.state.brandingcodeid}/></td>
                          <td><TextField name="brandingcode" placeholder="BrandCode" onChange={this.onHandleChange} variant="outlined" value={this.state.brandingcode}/></td>
                          <td><TextField name="classification" placeholder="Classification" variant="outlined" onChange={this.onHandleChange} value={this.state.classification}/></td>
                          <td><TextField name="organisation" variant="outlined" placeholder="Organisation" onChange={this.onHandleChange}value={this.state.organisation}/></td>
                          <td><TextField name="orchestration" variant="outlined" placeholder="Orchestration" onChange={this.onHandleChange} value={this.state.orchestration}/></td>
                      </tr>
                      <tr>
                          <td><TextField name="program" variant="outlined" placeholder="Program" onChange={this.onHandleChange} value={this.state.program}/></td>
                          <td><TextField name="equifexprogramtype" variant="outlined" placeholder="Equifexprogram" value={this.state.equifexprogramtype} onChange={this.onHandleChange}/></td>
                          <td><TextField name="adjudicationenginetype" variant="outlined" placeholder="AdjudicationEngine" value ={this.state.adjudicationenginetype} onChange={this.onHandleChange}/></td>
                          <td> <Select
                                    native
                                    variant="outlined"
                                    value={this.state.uwengine}
                                    onChange={this.onHandleChange}
                                    label="UWEngine"
                                    inputProps={{
                                        name: 'uwengine',
                                        id: 'outlined-age-native-simple',
                                    }}
                                    >
                                    <option aria-label="None" value="" >UWEngine</option>
                                    <option value="Interconnect">Interconnect</option>
                                    <option value="Powercurve">Powercurve</option>
                                    <option value="Smarts">Smarts</option>
                                    </Select>
                        </td> 
                        <td> 
                            <Button variant="contained" color="primary"  style={{display:'inline',textTransform:'capitalize', marginRight:"10%"}} size="large" onClick={this.RetriveRecords}>Search</Button>
                            <Button variant="contained" style={{display:'inline',textTransform:'capitalize', marginLeft:"2%"}} size="large" onClick={this.reset}>Reset</Button>
                        </td>                        
                      </tr>
                  </tbody>
              </table>
              </Box>
             
              
                         

              <div className="ag-theme-balham"
                    style={{width:1360,
                    height:400}}
                >
                
                <AgGridReact
                    columnDefs = {this.state.columnDefs}
                    defaultColDef={this.state.defaultColDef}
                    rowData={this.state.rowData}
                    onGridReady={params=>this.gridApi = params.api}
                    rowSelection="single"
                    rowHeight={55}
                    rowMultiSelectWithClick={true}
                    pagination={true}
                    paginationPageSize={5}
                    gridOptions={this.state.gridOptions}
                />
                
                </div>
          </div> 
        ) 
    }
    
}