import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

import loaderImg from "../../asset/images/loader/loader-hand.gif";

const Loader = ({ load }) => {
  const { loader } = useSelector((state) => state.CommonReducer);

  const isLoading = loader?.open || load;

  if (!isLoading) {
    return null;
  }

  return (
    <div className="loaderbody">
      <div className="overlay"></div>

      <div className="body">
        <div className="loader">
          <div className="loader__image">
            <div className="bg_overlay_loader"></div>

            <div className="loader__hand">
              <img
                src={loaderImg}
                title="Loading"
                alt="Loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  load: PropTypes.bool,
};

export default Loader;