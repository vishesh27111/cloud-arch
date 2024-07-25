// import React, { Component } from "react";
// import { storeProducts, detailProduct } from "./data";
// const ProductContext = React.createContext();

// class ProductProvider extends Component {
//     state = {
//         products: [],
//         detailProduct: detailProduct,
//         cart: [],
//         modalOpen: false,
//         modalProduct: detailProduct,
//         cartSubTotal: 0,
//         cartTax: 0,
//         cartTotal: 0
//     };
//     componentDidMount() {
//         this.setProducts();
//     }

//     filterProducts = (value) => {
//         value = value.toLowerCase();
//         let products = [];
//         storeProducts.forEach(item => {
//             if(item.title.toLowerCase().includes(value) || item.info.toLowerCase().includes(value)){
//                 const singleItem = { ...item };
//                 products = [...products, singleItem];
//             }
//         });
//         this.setState(() => {
//             return { products };
//         }, this.checkCartItems);
//     }

//     setProducts = () => {
//         let products = [];
//         storeProducts.forEach(item => {
//             const singleItem = { ...item };
//             products = [...products, singleItem];
//         });
//         this.setState(() => {
//             return { products };
//         }, this.checkCartItems);
//     };

//     getItem = id => {
//         const product = this.state.products.find(item => item.id === id);
//         return product;
//     };
//     handleDetail = id => {
//         const product = this.getItem(id);
//         this.setState(() => {
//             return { detailProduct: product };
//         });
//     };
//     addToCart = id => {
//         let tempProducts = [...this.state.products];
//         const index = tempProducts.indexOf(this.getItem(id));
//         const product = tempProducts[index];
//         product.inCart = true;
//         product.count = 1;
//         const price = product.price;
//         product.total = price;

//         this.setState(() => {
//             return {
//                 products: [...tempProducts],
//                 cart: [...this.state.cart, product],
//                 detailProduct: { ...product }
//             };
//         }, this.addTotals);
//     };
//     openModal = id => {
//         const product = this.getItem(id);
//         this.setState(() => {
//             return { modalProduct: product, modalOpen: true };
//         });
//     };
//     closeModal = () => {
//         this.setState(() => {
//             return { modalOpen: false };
//         });
//     };
//     increment = id => {
//         let tempCart = [...this.state.cart];
//         const selectedProduct = tempCart.find(item => {
//             return item.id === id;
//         });
//         const index = tempCart.indexOf(selectedProduct);
//         const product = tempCart[index];
//         product.count = product.count + 1;
//         product.total = product.count * product.price;
//         this.setState(() => {
//             return {
//                 cart: [...tempCart]
//             };
//         }, this.addTotals);
//     };
//     decrement = id => {
//         let tempCart = [...this.state.cart];
//         const selectedProduct = tempCart.find(item => {
//             return item.id === id;
//         });
//         const index = tempCart.indexOf(selectedProduct);
//         const product = tempCart[index];
//         product.count = product.count - 1;
//         if (product.count === 0) {
//             this.removeItem(id);
//         } else {
//             product.total = product.count * product.price;
//             this.setState(() => {
//                 return { cart: [...tempCart] };
//             }, this.addTotals);
//         }
//     };
//     getTotals = () => {
//         // const subTotal = this.state.cart
//         //   .map(item => item.total)
//         //   .reduce((acc, curr) => {
//         //     acc = acc + curr;
//         //     return acc;
//         //   }, 0);
//         let subTotal = 0;
//         this.state.cart.map(item => (subTotal += item.total));
//         const tempTax = subTotal * 0.1;
//         const tax = parseFloat(tempTax.toFixed(2));
//         const total = subTotal + tax;
//         return {
//             subTotal,
//             tax,
//             total
//         };
//     };
//     addTotals = () => {
//         const totals = this.getTotals();
//         this.setState(
//             () => {
//                 return {
//                     cartSubTotal: totals.subTotal,
//                     cartTax: totals.tax,
//                     cartTotal: totals.total
//                 };
//             },
//             () => {
//                 // console.log(this.state);
//             }
//         );
//     };
//     removeItem = id => {
//         let tempProducts = [...this.state.products];
//         let tempCart = [...this.state.cart];

//         const index = tempProducts.indexOf(this.getItem(id));
//         let removedProduct = tempProducts[index];
//         removedProduct.inCart = false;
//         removedProduct.count = 0;
//         removedProduct.total = 0;

//         tempCart = tempCart.filter(item => {
//             return item.id !== id;
//         });

//         this.setState(() => {
//             return {
//                 cart: [...tempCart],
//                 products: [...tempProducts]
//             };
//         }, this.addTotals);
//     };
//     clearCart = () => {
//         this.setState(
//             () => {
//                 return { cart: [] };
//             },
//             () => {
//                 this.setProducts();
//                 this.addTotals();
//             }
//         );
//     };
//     render() {
//         return (
//             <ProductContext.Provider
//                 value={{
//                     ...this.state,
//                     handleDetail: this.handleDetail,
//                     addToCart: this.addToCart,
//                     openModal: this.openModal,
//                     closeModal: this.closeModal,
//                     increment: this.increment,
//                     decrement: this.decrement,
//                     removeItem: this.removeItem,
//                     clearCart: this.clearCart,
//                     filterProducts: this.filterProducts
//                 }}
//             >
//                 {this.props.children}
//             </ProductContext.Provider>
//         );
//     }
// }

// const ProductConsumer = ProductContext.Consumer;

// export { ProductProvider, ProductConsumer };

import React, { Component } from "react";
import { fetchProducts } from "./api";

const ProductContext = React.createContext();
export const detailProduct = {
    id: 1,
    title: "Google Pixel - Black",
    img: "https://s3-mobile-images.s3.us-east-1.amazonaws.com/product-1.png",
    price: 10,
    company: "google",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0
};

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0
    };

    async componentDidMount() {
        await this.setProducts();
    }

    setProducts = async () => {
        try {
          const products = await fetchProducts();
          console.log('Setting products:', products); // Log to verify the transformed data
          this.setState(() => {
            return { products };
          }, this.checkCartItems);
        } catch (error) {
          console.error('Error setting products:', error);
        }
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        });
    };

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        product.total = product.price;

        this.setState(() => {
            return {
                products: [...tempProducts],
                cart: [...this.state.cart, product],
                detailProduct: { ...product }
            };
        }, this.addTotals);
    };

    openModal = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        });
    };

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        });
    };

    increment = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, this.addTotals);
    };

    decrement = (id) => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { cart: [...tempCart] };
            }, this.addTotals);
        }
    };

    getTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        return {
            subTotal,
            tax,
            total
        };
    };

    addTotals = () => {
        const totals = this.getTotals();
        this.setState(() => {
            return {
                cartSubTotal: totals.subTotal,
                cartTax: totals.tax,
                cartTotal: totals.total
            };
        });
    };

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        tempCart = tempCart.filter(item => item.id !== id);

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, this.addTotals);
    };

    clearCart = () => {
        this.setState(() => {
            return { cart: [] };
        }, async () => {
            await this.setProducts();
            this.addTotals();
        });
    };

    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
