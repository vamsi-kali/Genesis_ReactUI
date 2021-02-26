import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { rgbToHex } from "@material-ui/core";
import Logout from "./Logout";
export default class Topregion extends Component{
    render(){
        return(
            <span>
                <span><img src="https://www.genesis-fs.com/hs-fs/hubfs/change_site/images/logo.png?width=258&name=logo.png" alt="company image"/></span>
                <span >
                <DropdownButton
                    style={{marginLeft:"92%"}}
                    title= {this.props.uname}
                    id="dropdown-menu-align-right"
                >
                   <Logout/>
                </DropdownButton>
                </span>
            </span>
        )
    }
}