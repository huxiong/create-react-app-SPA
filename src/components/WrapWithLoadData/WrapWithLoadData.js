import React, { Component } from 'react';

export default (WrappedComponent,url) => {
	class NewComponent extends Component {
		constructor(props) {
			super(props);
			this.state = {
				data: null
			};
		};
		componentDidMount() {
			this.getData(url);
		};
		getData(url) {
			fetch(url)
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				console.log(data)
				this.setState({
					data: data
				});
			})
			.catch((error) => {
				console.log("get data fail",error);
			});
		};
		render() {
			return (
				<WrappedComponent data={this.state.data}></WrappedComponent>
			);
		};
	};
	return NewComponent;
};
