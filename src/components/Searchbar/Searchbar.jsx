import { useState } from "react";
import PropTypes from "prop-types";
import { ImSearch} from 'react-icons/im';
import { Wrapper, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "components/Searchbar/Searchbar.styled";

export const Searchbar = ({onSubmit}) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.currentTarget.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(value.trim());
        setValue("");
    };
 
    return (
        <Wrapper>
            <SearchForm onSubmit={handleSubmit}>
                <SearchFormButton type="submit">
                    <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    <ImSearch size={20} />
                </SearchFormButton>

                <SearchFormInput
                    className="input"
                    type="text"
                    value={value}    
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                />
            </SearchForm>
        </Wrapper>
    );
}

Searchbar.propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };