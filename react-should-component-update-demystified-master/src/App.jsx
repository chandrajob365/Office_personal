import React, { Component } from "react";
import faker from "faker";

class Product extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.product.isFav !== this.props.product.isFav;
	}
	render() {
		const { product } = this.props;
		console.log("Product rendered...");
		return (
			<li>
				<img src={product.url} />
				<h3>{product.title}</h3>
				<input
					type="checkbox"
					checked={product.isFav}
					onChange={() => {
						this.props.onProductChanged({ ...product, isFav: !product.isFav });
					}}
				/>
			</li>
		);
	}
}

class ProductList extends React.Component {
	render() {
		const products = this.props.products.map(product => {
			return (
				<Product
					key={product.id}
					product={product}
					onProductChanged={this.props.onProductChanged}
				/>
			);
		});
		return <ul>{products}</ul>;
	}
}

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			products: this.generateRandomProducts(600)
		};
	}

	generateRandomProducts = length => {
		const products = [];
		for (let i = 0; i < length; i++) {
			products.push({
				id: faker.random.uuid(),
				title: faker.company.companyName(),
				url: faker.image.imageUrl(),
				isFav: false
			});
		}
		return products;
	};

	onProductChanged = changedProduct => {
		const updatedProducts = this.state.products.map(product => {
			if (product.id === changedProduct.id) {
				return changedProduct;
			}
			return product;
		});
		this.setState({ products: updatedProducts });
	};

	render() {
		return (
			<div>
				<ProductList
					products={this.state.products}
					onProductChanged={this.onProductChanged}
				/>
			</div>
		);
	}
}
