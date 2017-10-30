import React, {Component} from 'react';
import "./Nav.css";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";

// import WrapComponent from "./../WrapWithLoadData/WrapWithLoadData";

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
        data: PropTypes.array
    };
    static defaultProps = {
        data: []
    };
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    };
    componentDidMount() {
        this.getList("./_mock_/nav.json");
    };
    getList(url) {
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((list) => {
            this.setState({
                list
            });
        })
        .catch((error) => {
            console.log("get list error",error);
        });
    };
    render() {
        const list = this.state.list;
        // const list = this.props.data;
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
// export default WrapComponent(Nav,"./_mock_/nav.json");