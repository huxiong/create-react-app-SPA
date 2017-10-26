import React, {
    Component
} from 'react';
import {Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Goods.css";

class GoodsItem extends Component {
    static propTypes = {
        item: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
        })
    };
    componentWillMount() {
    };
    render() {
        const item = this.props.item;
        const localPath = this.props.localPath;
        return (
            <Link to={localPath + "/detail/" + item.id}>
                <li className="goods-item">
                    <span>{ item.name }</span>
                    <span>￥{ item.price }</span>
                    <span>剩余：{ item.amount } </span>
                </li>
            </Link>
        );
    }
};

class Goods extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    };

    componentWillMount() {
        let pathname = this.props.location.pathname;
        let url = pathname.split("/").pop();
        console.log(url)
        this.getData(url);
    };

    getData(url) {
        fetch("./_mock_/"+ url +".json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    list: data
                });
            })
            .catch((error) => {
                console.log("error", error);
            })
    };
    render() {
        const list = this.state.list;
        return (
            <ul className="goods">
                {
                    list.map((item,index) => {
                        return(
                            <GoodsItem localPath={this.props.location.pathname} item={item} key={index.toString()}></GoodsItem>
                        );
                    })
                }
            </ul>
        );
    }
};

export default Goods;