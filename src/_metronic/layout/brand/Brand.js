/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import objectPath from "object-path";
import KTToggle from "../../_assets/js/toggle";
import * as builder from "../../ducks/builder";
import { ReactComponent as AngleDoubleLeftIcon } from "../assets/layout-svg-icons/Angle-double-left.svg";
import { ReactComponent as AngleDoubleRightIcon } from "../assets/layout-svg-icons/Angle-double-right.svg";
import { toAbsoluteUrl } from "../../utils/utils";

class Brand extends React.Component {
  ktToggleRef = React.createRef();

  componentDidMount() {
    // eslint-disable-next-line no-undef
    new KTToggle(this.ktToggleRef.current, this.props.toggleOptions);
  }

  render() {
    return (
      <div
        className={`kt-aside__brand kt-grid__item ${this.props.brandClasses}`}
        id="kt_aside_brand"
      >
        <div className="kt-aside__brand-logo">
          <Link style={{display:"flex"}} to="">
            {/*<img alt="logo" src={this.props.headerLogo} />*/}
            <img style={{maxWidth: 62, height: 40, marginRight:8}} alt="logo" src={toAbsoluteUrl("/media/logos/COVID_LOGO.svg")} />
           <p style={{fontSize:24, color:"#fff", marginRight:8, marginBottom:0, lineHeight: 1.6}}>HealthPass</p>
          </Link>
        </div>

        {this.props.asideSelfMinimizeToggle && (
          <div className="kt-aside__brand-tools">
            <button
              ref={this.ktToggleRef}
              className="kt-aside__brand-aside-toggler"
              id="kt_aside_toggler"
            >
              <span>
                <AngleDoubleLeftIcon />
              </span>
              <span>
                <AngleDoubleRightIcon />
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    brandClasses: builder.selectors.getClasses(store, {
      path: "brand",
      toString: true
    }),
    asideSelfMinimizeToggle: objectPath.get(
      store.builder.layoutConfig,
      "aside.self.minimize.toggle"
    ),
    headerLogo: builder.selectors.getLogo(store),
    headerStickyLogo: builder.selectors.getStickyLogo(store),
    toggleOptions: {
      target: "body",
      targetState: "kt-aside--minimize",
      togglerState: "kt-aside__brand-aside-toggler--active"
    }
  };
};

export default connect(mapStateToProps)(Brand);
