/**
 *
 * SearchComponent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCategories,
  makeSelectSearchCategory,
  makeSelectSearchText,
} from './selectors';
import {
  loadCategoriesRequest,
  setSearchCategory,
  setSearchText,
} from './actions';

const styles = {
  formControl: {
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {},
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

/* eslint-disable react/prefer-stateless-function */
class SearchComponent extends React.Component {
  state = { categories: this.props.categories.toJS() };
  componentDidMount() {
    if (this.props.categories.size === 0) {
      this.props.loadCategories();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.categories !== this.props.categories) {
      this.setState({ categories: nextProps.categories.toJS() });
    }
  }

  handleChange = name => event => {
    event.persist();
    const { value } = event.target;
    switch (name) {
      case 'category':
        this.props.setSearchCategory(value);
        break;
      case 'text':
        this.props.setSearchText(value);
        break;
    }
  };

  render() {
    const { classes, searchCategoryId, searchText } = this.props;
    const { categories } = this.state;
    return (
      <div className="text-center">
        <br />
        <br />
        <h2>Ask To Marina</h2>

        <strong className="content-title">
          BE A PART OF THE LOCAL SEARCH REVOLUTION
        </strong>
        <br />
        <div className="search-container">
          <div className="row">
            <Select
              value={searchCategoryId}
              onChange={this.handleChange('category')}
              inputProps={{
                name: 'category',
                id: 'search-category',
              }}
            >
              {Object.keys(categories).map(each => (
                <MenuItem
                  key={categories[each]._id}
                  value={categories[each]._id}
                >
                  {categories[each].CategoryName}
                </MenuItem>
              ))}
            </Select>
            <TextField
              value={searchText}
              onChange={this.handleChange('text')}
              className="col-6"
              fullWidth
              label="Please Input"
            />
            {/* <TextField
              className="col-4"
              id="standard-select-category"
              select
              label="Select"
            />


            <Button
              size="small"
              className="col-2"
              variant="contained"
              color="primary"
            >
              Search
            </Button> */}
          </div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

SearchComponent.propTypes = {};

const withStyle = withStyles(styles);

const withReducer = injectReducer({ key: 'homePageSearchComponent', reducer });
const withSaga = injectSaga({ key: 'homePageSearchComponent', saga });

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  searchCategoryId: makeSelectSearchCategory(),
  searchText: makeSelectSearchText(),
});

const mapDispatchToProps = dispatch => ({
  loadCategories: () => dispatch(loadCategoriesRequest()),
  setSearchCategory: payload => dispatch(setSearchCategory(payload)),
  setSearchText: payload => dispatch(setSearchText(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withStyle,
  withReducer,
  withSaga,
  withConnect,
)(SearchComponent);
