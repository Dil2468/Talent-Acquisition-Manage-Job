import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment,Table,Button } from 'semantic-ui-react';

import { matchPath } from 'react-router-dom';

export default class ManageJob extends React.Component {
    constructor(props) {
        
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
       
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
           
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: true,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
           
        }
     

        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
      
        
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
       
    
    }




    componentDidMount() {
        this.init();
        this.loadData();
      
    };

    

    loadData(callback) {
        /*http://localhost:51689*/
        
        var link = 'https://talentservice-talent.azurewebsites.net/listing/listing/getEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
          
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
               
                let loadJobs = null;
                if (res.myJobs) {
                    loadJobs = res.myJobs;
                
                   this.setState({loadJobs:loadJobs})
                }
              
               
                // this.updateWithoutSave(loadJobs)
            }.bind(this),
            error: function (res) {
         console.log(res)
              
             
            }})
       
          
       
    
    this.init()



       // your ajax call and other logic goes here
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
 
        let  itemperpage= 2;
        let currentpage = Math.ceil(this.state.loadJobs.length/itemperpage);
        
        let indexoflaststitem=itemperpage*this.state.activePage;
      
       let indexoffirstitem=indexoflaststitem-itemperpage;
    
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
               <div className ="ui container">
               <h1><b>List of Jobs</b></h1>
           <div >
             <Table basic="very" collapsing>
             <Table.Header>
      <Table.Row>
        <Table.Cell>
        <label><Icon name='filter'></Icon>Filters:<Dropdown 
        text='Choose Filters'>
            <Dropdown.Menu>
           <Dropdown.Item>Active</Dropdown.Item> 
           <Dropdown.Item>Closed</Dropdown.Item> 
           <Dropdown.Item>Draft</Dropdown.Item> 
           <Dropdown.Item>Expired</Dropdown.Item> 
           </Dropdown.Menu>
            </Dropdown> </label>
       <label> <Icon name='calendar alternate'></Icon>Sort By Date:<Dropdown
       text='Newest First'></Dropdown></label>
        </Table.Cell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        
  <Table.Row>
       
      <Table.Cell>
            
     
           <JobSummaryCard
           loadJobs={this.state.loadJobs}
           indexoflaststitem={indexoflaststitem}
           indexoffirstitem={indexoffirstitem}
           
           />
      </Table.Cell>
      
      </Table.Row> 
    
    </Table.Body>
  </Table>
  </div>

<div style={{
    display:"flex",
    justifyContent:"center",
    marginBottom:30
}}>
      <Pagination
      ellipsisItem={null}
      
     defaultActivePage={this.state.activePage} 
      totalPages={currentpage}
      onPageChange={(e,{activePage})=>this.setState({activePage})} 
      />

      </div>     
        
               </div>
            </BodyWrapper>
        )
    }
}