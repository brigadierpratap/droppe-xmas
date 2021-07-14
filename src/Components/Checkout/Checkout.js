import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { sortFinalCart } from "../../Redux/ActionCreators";
import Loader from "../Loader/Loader";
import "./Checkout.css";
export class Checkout extends Component {
  constructor(props) {
    super(props);
    this._mounted = false;
    this.state = {
      accepted: [],
      disregarded: [],
      discount: {},
      loading: true,
    };
  }
  //Accepted products
  setAccepted = () => {
    var finalCart = this.props.finalCart.info;
    for (let i of finalCart) {
      const accp = i.products.filter(prod => prod.approved);
      const finalAccptd = accp.map(prod => {
        return {
          productId: prod.productId,
          quantity: prod.quantity,
          cartId: parseInt(i.id),
        };
      });
      this.setState(
        prev => ({ accepted: [...prev.accepted, ...finalAccptd] }),
        () => {
          this.calcDiscount();
        }
      );
    }
  };

  //Disregarded Orders
  setDisregarded = () => {
    var old = this.props.oldCart.info;
    var newCart = this.props.finalCart.info;
    for (let i of old) {
      var temp = newCart.filter(nCart => nCart.id == i.id);
      if (temp.length > 0) {
        var dis = temp[0].products.filter(prod => !Boolean(prod.approved));
        const finalDisrgrd = dis.map(prod => {
          return {
            productId: prod.productId,
            quantity: prod.quantity,
            cartId: parseInt(i.id),
          };
        });
        this.setState({
          disregarded: [...this.state.disregarded, ...finalDisrgrd],
        });
      } else {
        const finalDisregarded = i.products.map(prod => {
          return {
            productId: prod.productId,
            quantity: prod.quantity,
            cartId: parseInt(i.id),
          };
        });
        this.setState(prev => ({
          disregarded: [...prev.disregarded, ...finalDisregarded],
        }));
      }
    }
  };

  //set discount
  calcDiscount = () => {
    const finalCart = this.props.finalCart.info;

    for (let i of this.state.accepted) {
      if (Boolean(this.state.discount.productId)) continue;
      var count = 0;
      for (let j of finalCart) {
        var k = j.products.filter(prod => prod.productId == i.productId);
        if (k.length > 0) {
          count = count + 10;
        }
      }
      const disc = this.state.discount;
      disc[i.productId] = count;
      this.setState({ discount: disc });
    }
  };
  componentDidMount = () => {
    this._mounted = true;
    if (!Boolean(this.props.finalCart.info[0])) {
      this.props.history.push("/not-found");
    } else {
      this.props.sortFinal(this.props.finalCart.info);
      this.setAccepted();
      this.setDisregarded();
      this.setState({ loading: false });
    }
  };

  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <div className="checkout-container">
        <div className="checkout-title">Checkout</div>
        <div className="checkout-inner">
          <div className="checkout-accepted">
            <div
              style={{
                textAlign: "center",
                marginTop: "1em",
                marginBottom: "1em",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Accepted Products
            </div>
            <div className="checkout-row">
              <span className="cart-id">Cart</span>
              <span>ProductId</span>
              <span>Discount</span>
              <span>Quantity</span>
            </div>
            {this.state.accepted.map((prod, i) => {
              return (
                <div key={i} className="checkout-row checkout-inner-rows">
                  <span className="cart-id">{prod.cartId}</span>
                  <span>{prod.productId}</span>
                  <span>{this.state.discount[prod.productId]}</span>
                  <span>{prod.quantity}</span>
                </div>
              );
            })}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "2em",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              <span>Total Price</span>
              <span>$ XYZ</span>
            </div>
            <div className="checkout-button">
              <button className="confirm">Confirm</button>
              <button className="back">Back</button>
            </div>
          </div>
          {this.state.disregarded.length > 0 && (
            <div className="checkout-disregarded">
              <div className="disreg-title">Disregarded Products</div>
              <div className="disreg-cont">
                {this.state.disregarded.map((prod, i) => {
                  return (
                    <div className="disreg-row" key={i}>
                      <span>Cart-{prod.cartId}</span>
                      <span>Product-{prod.productId}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  finalCart: state.FinalCart,
  oldCart: state.OriginalCart,
});
const mapDispatchToProps = dispatch => ({
  sortFinal: data => dispatch(sortFinalCart(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
