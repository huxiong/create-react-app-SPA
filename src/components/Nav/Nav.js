import React, {Component} from 'react';
import "./Nav.css";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

class ListItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            url: PropTypes.string,
            item: PropTypes.isRequired
        })
    };
    render() {
        const item = this.props.item;
        return (
            <NavLink to={item.url} activeClassName="active">
                <li>{item.text}</li>
            </NavLink>
        );
    };
};

class Nav extends Component { 
    static propTypes = {
        list: PropTypes.array
    };
    static defaultProps = {
        list: []
    };
    render() {
        const list = this.props.list;
        return (
            <ul className="nav">
                {
                    list.map((item,index) => {
                        return (
                            <ListItem item={item} key={index.toString()}></ListItem>
                        );
                    })
                }
            </ul>
        );
    };         
};


export default Nav;