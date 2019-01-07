import React from 'react';
import ReactDOM from 'react-dom';
import history from "./history";

import { Breadcrumb, Icon, Button, Row, Col } from 'antd';

export default class NavBar extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    goUrl(url) {
        if (url) {
            history.push(url)
            
        } else {
            history.goBack()
        }
    }

    render() {
        var { navs, back_url, parent } = this.props;
        return (
            <div className='breadcrumb' style={{ marginBottom: 16, marginRight: 150 }} >
                <Row type="flex" justify="space-between" align="middle">
                    <Col>
                        <Breadcrumb>
                            {parent && parent.props && parent.props.route && parent.props.route.moduleName ?
                                <Breadcrumb.Item >
                                    <span>{parent.props.route.moduleName}</span>
                                </Breadcrumb.Item> : null
                            }

                            {navs.map((item, i) => {
                                if (item.href) {
                                    return (
                                        <Breadcrumb.Item key={i}>
                                            <a href='javascript:void 0;' onClick={this.goUrl.bind(this, item.href)}  >
                                                {item.type ? <Icon type={item.type} /> : null}
                                                <span>{item.title}</span>
                                            </a>
                                        </Breadcrumb.Item>
                                    )
                                }
                                return (
                                    <Breadcrumb.Item key={i}>
                                        {item.type ? <Icon type={item.type} /> : null}
                                        <span>{item.title}</span>
                                    </Breadcrumb.Item>
                                )

                            })}

                        </Breadcrumb>
                    </Col>
                    <Col>
                        {navs.length > 1 ?
                            <Button type="primary" onClick={this.goUrl.bind(this, back_url)} >返回</Button>
                            :
                            null
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}
