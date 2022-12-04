

const Option = ({ children, value, ...props }) => {
    return (
        <option value={value} {...props}>
        {children}
        </option>
    );    
};

export default Option;