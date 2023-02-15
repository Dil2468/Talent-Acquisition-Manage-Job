import React from 'react';
import Cookies from 'js-cookie';
import { Item, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';


import { Button,Card,Label,Icon } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
       
 this.state={
    loadJobs:[]
    
 }

        this.selectJob = this.selectJob.bind(this)
    }
    
   
    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        /*http://localhost:51689*/
        var url = `https://talentservice-talent.azurewebsites.net/listing/listing/closeJob/`;

        $.ajax({
            url,
     
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
        
            dataType:'json',
            type: "post",
            data: JSON.stringify(id),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    console.log(res)
                    TalentUtil.notification.show(res.message, "success", null, null);
        
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null)
                }
             
            }
            .bind(this)
            
        })
   
    }
   
    componentDidUpdate(prevProps, prevState) {
        let newstate = this.props.loadJobs
        
        if (prevState && prevState.loadJobs !== newstate) {
          this.setState({loadJobs: newstate});
        }
      
      }
      

    render() {

const {
    indexoffirstitem,
    indexoflaststitem
  
    }=this.props
  
    let data=(this.state.loadJobs.slice(indexoffirstitem,indexoflaststitem));

        return(
          
            <div>
        
            <Card.Group  >
        
              {data.map((e,index)=>(
        
             <Card style={{display:"inline-table"}}
             
             key={index} 
             
             >
   
                 <Card.Content >
                 <div    style={{
                marginBottom: 120
                
             }} > 
              
            <Card.Header><strong>{e.title}</strong></Card.Header>
            <Label  color='black' ribbon='right'>
             <Icon name='user'></Icon> 0
            </Label>
            <Card.Meta>{e.location.country},{e.location.city}</Card.Meta>
            <Card.Description>
              <strong>{e.summary}</strong> 
            </Card.Description>
            </div>
          </Card.Content>
         
          <Card.Content  style={{display:"flex",
        justifyItems: "center",
        alignItems: "center"}} >
            
          <div style={{display:'flex',
          flexDirection:'row'
         }} > 
          
          <div style={{display:'flex',
        alignItems: 'center',
        marginRight:35}}>
            <Button style={{display:"flex"}}  type="button"  color='red' size='mini'> Expired</Button>
            </div>
            <Button.Group basic color='blue' size='mini' style={{display:"flex",
        justifyContent: "center"
       }} >
              
                
                <Button style={{display:"flex"}} type="button"   onClick={()=>this.selectJob(e.id)}><Icon size='small' name='ban'></Icon>Close</Button>
                <Link to ={`/EditJob/${e.id}`}>
              <Button style={{display:"flex"}} type="button"   
                >
                <Icon size='small' name='edit'> </Icon>Edit
              </Button>
             </Link>
              <Button  style={{display:"flex"}} type="button"     >
               <Icon size='small' name='copy outline'></Icon> Copy
              </Button>
              
              
              </Button.Group>
              </div>
              
          </Card.Content>
          
        </Card>
        
              ))}
              
                 
        </Card.Group>
        </div>
                
          
        )
    }
}