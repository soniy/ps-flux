import React from 'react';
import PropTypes from 'prop-types';

export default function SelectBox(props) {
    let wrapperClass = "form-group";
    if (props.error.length > 0) {
        wrapperClass += " has-error";
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={props.id}>{props.label}</label>
            <div className="field">
                <select
                    id={props.id}
                    name={props.name}
                    value={props.value}
                    className="form-control"
                    onChange={props.onChange}
                >
                    {props.dropdownlist.map(item =>
                        <option key={item.key} value={item.key}>{item.value}</option>
                    )}

                </select>
            </div>
            { props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>
    )
}

SelectBox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    dropdownlist: PropTypes.array
};

SelectBox.defaultProps = {
    error: "",
    value: "",
    dropdownlist: []
}