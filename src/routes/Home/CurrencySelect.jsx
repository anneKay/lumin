import React from "react";
import { useQuery } from 'react-apollo';
import GET_CURRENCY from "../../query/get_currency";
import PropTypes from 'prop-types';


const CurrencyOptions = ({setCurrency}) => {

  const { loading, error, data } = useQuery(GET_CURRENCY);

  let currencies = [];
  (loading || error) ? currencies = [] : currencies = data.__type.enumValues;

  return (
    <select name="currency" id="currency"
      onChange={event => setCurrency(event.target.value)}
    >
      {currencies.map((currency, index) => (
        <option key={index} value={currency.name}>
          {currency.name}
        </option>
      ))}
    </select>
  )
}

CurrencyOptions.propTypes = {
  setCurrency: PropTypes.func.isRequired,
};

export default CurrencyOptions;
