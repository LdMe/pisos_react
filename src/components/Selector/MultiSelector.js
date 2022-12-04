import { useState } from "react";
import { useEffect } from "react";
import './styles.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {Modal} from 'react-bootstrap';
const MultiSelector = ({ name, options, selected, onChange , labels=[]}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    
    const handleSearch = (event) => {
        setSearch(event.target.value);
        setFilteredOptions(
        options.filter((option) =>
            option.toLowerCase().includes(event.target.value.toLowerCase())
        )
        );
    };
    
    const handleToggle = () => {
        setOpen(!open);
    };
    
    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);
    
    const selectAll = () => {
        console.log("select all");
        onChange(name, options);
    };
    const selectNone = () => {
        console.log("select none");
        onChange(name, []);
    };
    useEffect(() => {
        selectAll();
    }, []);
    const handleSelect = (option) => {
        console.log("option",option);

        if (selected.includes(option)) {
        onChange(name,selected.filter((item) => item !== option));
        } else {
        onChange(name,[...selected, option]);
        }
        /* call function in 2 seconds */
        setTimeout(() => {
            setSearch('');
            setFilteredOptions(options);
        }, 300);
    };
    
    return (
        <div>
            <button onClick={handleToggle}>Select {name} <FontAwesomeIcon icon={faChevronDown} /> </button>
            <Modal show={open} onHide={() => setOpen(false)} >    
                <div className="multi-selector">
                    <button onClick={selectAll}>Select All</button>
                    <button onClick={selectNone}>Clear</button>

                    <button className="exit-button " onClick={() => setOpen(false)}>Close</button>
                    <div className="multi-selector__search">
                        <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={handleSearch}
                        />
                    </div>
                    <div className="multi-selector__options">
                        {filteredOptions.map((option) => (
                        <div
                            key={option}
                            className={`multi-selector__option ${
                            selected.includes(option) ? 'multi-selector__option--selected' : ''
                            }`}
                            onClick={() => handleSelect(option)}
                        >
                            {labels.length > 0 ? labels[options.indexOf(option)] : option}
                        </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    );
    }

export default MultiSelector;