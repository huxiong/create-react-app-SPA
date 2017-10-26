import React, {
	Component
} from 'react';


class GoodsDetail extends Component {
	render() {
		const match = this.props.match;
		return (
			<div>这是{match.params.id}的明细</div>
		);
	};
};


export default GoodsDetail;