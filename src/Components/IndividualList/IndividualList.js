import React, { Component } from "react";
import "./IndividualList.css";
import { connect } from "react-redux";
import { addCarts, addFinalCarts } from "../../Redux/ActionCreators";
import { withRouter } from "react-router-dom";
import Loader from "../Loader/Loader";
class IndividualList extends Component {
  constructor(props) {
    super(props);
    this._mounted = false;
    this.state = { cart: {}, loading: true, acceptedproducts: [] };
  }

  //Incrementing Quantity of a said product
  incrementQuantity = prodId => {
    const newCart = this.state.cart;
    for (let i of newCart.products) {
      if (i.productId === prodId) {
        i.quantity = i.quantity + 1;
      }
    }
    if (this._mounted) this.setState({ cart: newCart });
  };

  //Decreasing quantity if not already 0.
  decrementQuantity = prodId => {
    const newCart = this.state.cart;
    for (let i of newCart.products) {
      if (i.productId === prodId) {
        if (i.quantity <= 0) return;
        i.quantity = i.quantity - 1;
      }
    }
    if (this._mounted) this.setState({ cart: newCart });
  };

  //Accepting product
  acceptProduct = prodId => {
    const newCart = this.state.cart;
    for (let i of newCart.products) {
      if (i.productId === prodId) {
        if (i.quantity === 0) i.approved = false;
        else i.approved = true;
        break;
      }
    }
    this.setState({ loading: true });
    this.updateCart(newCart);
  };

  //Deny Product
  denyProduct = prodId => {
    const newCart = this.state.cart;
    for (let i of newCart.products) {
      if (i.productId === prodId) {
        i.approved = false;
        break;
      }
    }

    this.setState({ loading: true });
    console.log(newCart);
    this.updateCart(newCart);
  };

  //Update cart using API call to fakestore API
  updateCart = async cart => {
    await fetch(`https://fakestoreapi.com/carts/${cart.id}`, {
      method: "PUT",
      body: JSON.stringify({
        userId: cart.userId,
        date: new Date(),
        products: cart.products,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ cart: json, loading: false });
        var finalCart = this.props.finalCart.info;
        let flag = false;

        for (let i in finalCart) {
          if (finalCart[i].id === json.id) {
            flag = true;
            finalCart[i] = json;
          }
        }
        if (flag === false) finalCart = [...finalCart, json];
        this.props.updateFinalCart(finalCart);
      })
      .catch(e => {
        this.setState({ loading: false });
        alert("Error Occured! Retry.");
      });
  };

  componentDidMount = () => {
    this._mounted = true;
    this.setState({ cart: this.props.cart, loading: false });
    if (Boolean(this.props.oldCart.info[this.props.match.params.id - 1])) {
      if (this._mounted)
        this.setState({
          cart: this.props.oldCart.info[this.props.match.params.id - 1],
          loading: false,
        });
    } else {
      this.props.history.push("/not-found");
    }
  };

  componentWillUnmount = () => {
    this._mounted = false;
  };

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <div className="ind-list-cont">
        {this.state.cart.products.map((prod, i) => {
          return (
            <div key={i} className="product-tile">
              <span className="banner">
                {prod.approved === true && <span>Approved</span>}
                {prod.approved === false && <span>Denied</span>}
              </span>
              <span>Product Id : {prod.productId}</span>
              <span className="prod-quant">
                Quantity :{" "}
                <span
                  className="quantity-left"
                  onClick={e => {
                    this.decrementQuantity(prod.productId);
                  }}
                  style={{
                    borderRightColor:
                      prod.quantity === 0 ? "grey" : "rgb(108, 99, 255)",
                    cursor: prod.quantity === 0 ? "not-allowed" : "pointer",
                  }}
                ></span>
                {prod.quantity}{" "}
                <span
                  className="quantity-right"
                  onClick={e => {
                    this.incrementQuantity(prod.productId);
                  }}
                ></span>
              </span>
              <div className="prod-tile-btns">
                <button
                  onClick={e => {
                    this.acceptProduct(prod.productId);
                  }}
                  className="accept"
                >
                  Accept
                </button>
                <button
                  onClick={e => {
                    this.denyProduct(prod.productId);
                  }}
                  className="deny"
                >
                  Deny
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  oldCart: state.OriginalCart,
  finalCart: state.FinalCart,
});
const mapDispatchToProps = dispatch => ({
  updateFinalCart: data => dispatch(addFinalCarts(data)),
  updateOldCart: data => dispatch(addCarts(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IndividualList)
);
