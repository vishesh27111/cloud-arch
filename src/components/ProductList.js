import React from 'react';
import Product from './Product';
import Title from './Title';
import { ProductConsumer } from '../context';
import { ThemeConsumer } from './context/ThemeContexts';

class ProductList extends React.Component {
  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <ProductConsumer>
            {(value) => (
              value.products.length > 0 ?
                <div className={theme ? 'py-5 bg-slate-900' : 'py-5 bg-slate-200'}>
                  <div className="container">
                    <div>
                      <Title className="text-light" name="our" title="products" />
                      <div className="row">
                        {value.products.map((product) => {
                          return <Product key={product.id} product={product} />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className={theme ? 'py-5 bg-slate-900' : 'py-5 bg-slate-200'}>
                  <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <p style={{
                        color: 'red'
                      }}>Sorry, no results found!</p>
                    </div>
                    <div className="col-10 mx-auto text-center text-title text-primary">
                      <p style={{
                        color: 'black'
                      }}>Please check the spelling or try searching for something else</p>
                    </div>
                  </div>
                </div>

            )
            }
          </ProductConsumer>
        )}
      </ThemeConsumer>
    );
  }
}

export default ProductList;
