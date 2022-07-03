import React from "react";
import PropTypes from 'prop-types'
const TotalPrice = ({ income, outcome }) =>
    <div>
        <span className="col-6" color={'#fff'}>income:{income}</span>
        <span className="col-6" color={'#fff'}>income:{outcome}</span>
    </div>

TotalPrice.propTypes = {
    income: PropTypes.number.isRequired,
    outcome: PropTypes.number.isRequired,
}
TotalPrice.defaultProps = {
    income: 0,
    outcome: 0,
}
export default TotalPrice