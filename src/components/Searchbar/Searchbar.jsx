import React, { Component } from "react";
import PropTypes from "prop-types";
import { ImSearch} from 'react-icons/im';
import { Wrapper, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "components/Searchbar/Searchbar.styled";

export class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        value: "",
    };

    onChange = (e) => {
        this.setState({value: e.currentTarget.value});
    };

    onSubmit = (e) => {
        e.preventDefault();

        this.props.onSubmit(this.state.value);
    };

    render() { 
        return (
            <Wrapper>
                <SearchForm onSubmit={this.onSubmit}>
                    <SearchFormButton type="submit">
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                        <ImSearch size={20} />
                    </SearchFormButton>

                    <SearchFormInput
                        className="input"
                        type="text"
                        value={this.state.value}    
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.onChange}
                    />
                </SearchForm>
            </Wrapper>
        );
    };
}