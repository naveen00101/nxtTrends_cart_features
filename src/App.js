import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAll = () => {
    this.setState({cartList: []})
  }

  removeCartItem = productId => {
    this.setState(prevState => {
      const newList = prevState.cartList.filter(each => each.id !== productId)
      return {cartList: newList}
    })
  }

  increaseQuantity = productId => {
    this.setState(prevState => {
      const newList = prevState.cartList.map(each =>
        each.id === productId ? {...each, quantity: each.quantity + 1} : each,
      )
      return {cartList: newList}
    })
  }

  decreaseQuantity = productId => {
    this.setState(prevState => {
      const newList = prevState.cartList
        .filter(each => each.quantity !== 1)
        .map(each =>
          each.id === productId ? {...each, quantity: each.quantity - 1} : each,
        )
      return {cartList: newList}
    })
  }

  addCartItem = product => {
    this.setState(prevState => {
      let updatedProduct
      let added = false
      if (prevState.cartList.length > 0) {
        updatedProduct = prevState.cartList.map(each => {
          console.log('im in')
          if (each.id === product.id) {
            added = true
            return {...each, quantity: each.quantity + product.quantity}
          }
          return each
        })
      } else {
        added = true
        updatedProduct = [product]
      }

      updatedProduct = !added ? [...updatedProduct, product] : updatedProduct
      console.log(prevState.cartList.length)
      return {cartList: updatedProduct}
    })
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAll,
          incrementCartItemQuantity: this.increaseQuantity,
          decrementCartItemQuantity: this.decreaseQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
