import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { addCarts } from "../../Redux/ActionCreators";
import "./Wishlists.css";
import ribbon from "../../Assets/ribbon.svg";
import Loader from "../Loader/Loader";
export class WishLists extends Component {
  constructor(props) {
    super(props);
    this._mounted = false;
    this.state = {
      carts: [],
      loading: true,
      err: null,
      finalProducts: [],
      totalPrice: 0,
    };
  }

  updateCart = (cartId, userId, productId, quantity) => {};

  getCarts = async () => {
    await fetch("https://fakestoreapi.com/carts?limit=5")
      .then(res => res.json())
      .then(json => {
        this.props.updateOldCart(json);
        if (this._mounted) this.setState({ carts: json, loading: false });
      })
      .catch(e => {
        if (this._mounted) this.setState({ loading: false, err: e.message });
      });
  };
  componentDidMount = () => {
    this._mounted = true;
    if (!Boolean(this.props.oldCart.info[0])) {
      this.getCarts();
    } else {
      this.setState({ carts: this.props.oldCart.info, loading: false });
    }
  };
  componentWillUnmount = () => {
    this._mounted = false;
  };

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <>
        <div className="wishlist-container">
          {this.state.carts.map(cart => {
            return (
              <Link
                key={cart.id}
                style={{ position: "relative" }}
                to={`/wishlists/${cart.id}`}
              >
                <div className="cart-tile">
                  <span className="cart-title">Cart - {cart.id}</span>
                  <img src={ribbon} className="cart-ribbon" alt="ribbon" />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="wishlist-order">
          <Link to="/checkout">Order</Link>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  oldCart: state.OriginalCart,
});
const mapDispatchToProps = dispatch => ({
  updateOldCart: data => dispatch(addCarts(data)),
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WishLists)
);
