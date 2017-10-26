import React, {
	Component
} from 'react';
import {
	Route
} from "react-router-dom";
import Goods from "./../components/Goods/Goods";
import GoodsDetail from "./../components/GoodsDetail/GoodsDetail";

export default class GoodsContainer extends Component {
	render() {
		return (
			<div>
        <Route path="/goods" exact component={Goods}></Route>
        <Route path="/goods/detail/:id" component={GoodsDetail}></Route>
        <Route path="/product" exact component={Goods}></Route>
        <Route path="/product/detail/:id" component={GoodsDetail}></Route>
      </div>
		);
	};
};