import React,{Component} from 'react'
import { Link } from 'react-router-dom'

class headerLogo extends Component{
    state = { visible: false, placement: 'left' };
    render(){
        return(
            <div className="header-logo">
                <Link to='/' replace >Nathan</Link>
            </div>
        )
    }
}
export default headerLogo
