import './form-input.styles.scss'

const FormInput = ( { label, ...otherProps } ) => {
    return (
        <div className="group">
            <input className="form-input" {...otherProps} />
            {label && ( //in label exists then render the label
                <label className={`${
                    otherProps.value.length ? 'shrink': '' //shrink class makes an effect on the label
                    } form-input-label`}
                >
                    {label}
                </label>
            )}
        </div>
    )
}

export default FormInput