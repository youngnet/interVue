import React from 'react';
import ReactDOM from 'react-dom';


export default class ContentBody extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state={};
    }


    render() {
        var {title,navs,children} = this.props;
       return (
            
            <div style={{background:'#FFF',minHeight:400,padding:16}}>
                {this.props.children}
            </div>
              
        )

    }
}
// ContentBody.contextTypes= { router: React.PropTypes.object.isRequired};
