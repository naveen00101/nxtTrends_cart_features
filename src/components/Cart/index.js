import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const removeAll = () => {
        removeAllCartItems()
      }

      const getPrice = () => {
        let Total = 0
        Total = cartList.reduce((T, each) => T + each.price * each.quantity, 0)
        return Total
      }

      const Total = getPrice()

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-btn"
                  onClick={removeAll}
                  type="button"
                >
                  Remove All
                </button>
                <CartListView />
                <div className="bill-summary">
                  <h2 className="order-total">
                    Order Total :{' '}
                    <span className="total">{`Rs ${Total}/-`}</span>
                  </h2>
                  <p>{`${cartList.length} items in cart`}</p>
                  <button className="checkout-btn" type="button">
                    CheckOut
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
