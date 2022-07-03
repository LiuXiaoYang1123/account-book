import React from "react";
import PropTypes from 'prop-types'
const TotalPrice = ({ income, outcome }) =>
    <div>
        <h3 className="col-6" color={'#fff'} >income:{income}</h3>
        <h3 className="col-6" color={'#fff'}>outcome:{outcome}</h3>
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