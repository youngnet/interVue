import React from 'react';
import {  Router, Route, Link } from "react-router-dom";
import history from "common/history";
import routes from "./router";
import {message } from 'antd';
import Navigation from "common/Navigation";

import api from "utils/api";
import cookie from "js-cookie";

import "antd/dist/antd.min.css"



message.config({
  top: 100,
  duration: 2,
});

export default class App extends React.Component{
    constructor(props, context){
        super(props, context);
    }

    componentWillMount(){
      
    }

    wraperComponent(Comp){
        return (props) => {
            return (     
                    <Comp {...props} $api={api} $cookie={cookie} /> 
            );
        };
    }


    render(){
        return (
            <Navigation history={history}>
            <Router key={Math.random()} history={history}>
                <div>
                {routes.map((item,index) => {
                    return (
                        <Route 
                            exact
                            key={index} 
                            path={item.path} 
                            render={this.wraperComponent(item.component)}
                        />
                    )
                })}
                </div>
            </Router>
            </Navigation>
        );
    }
}
