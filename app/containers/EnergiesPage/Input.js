
/*
 *
 * EnergiesPageInput
 *
 */

import React, { PropTypes } from 'react';
import styled from 'styled-components';

import Button from 'material-ui/Button';
import { LinearProgress } from 'material-ui/Progress';


import { MdSearch } from 'react-icons/lib/md';

import axios from 'axios';
import { graphQLRoot } from 'utils/constants';

import TermAutosuggest from './TermAutosuggest';

const MButton = styled(Button)`
  margin: 25px;
  marginLeft: 0;
`;


const initialState = {
  reactant_options: [],
  product_options: [],
  facet: '',
  surface: '',
  reactants: { label: 'any', value: '' },
  products: { label: 'any', value: '' },
  loading: false,
};

export class EnergiesPageInput extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = initialState;
    // Workaround, instead of calling .bind in every render
    this.submitForm = this.submitForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.setSubstate = this.setSubstate.bind(this);
  }
  componentDidMount() {
    this.updateOptions();
  }

  setSubstate(key, value) {
    const newSubstate = {};
    newSubstate[key] = value;
    this.setState(newSubstate);
  }

  updateOptions(blocked = '') {
    let query = '';
    // Fetch Available Reactants
    if (blocked !== 'reactants' && this.state.reactants.label === 'any') {
      query = `{catapp(products: "~${this.state.products.value || ''}", reactants: "~", distinct: true) { edges { node { reactants } } }}`;
      axios.post(graphQLRoot, {
        query,
      }).then((response) => {
        let reactants = [];
        const reactant = (response.data.data.catapp.edges.map((elem) => JSON.parse(elem.node.reactants)));
        reactants = reactant.map((r) => ({ key: Object.keys(r).join(' + '), value: Object.keys(r).join(' + ') }));
        reactants.push({ label: 'any', value: '' });
        this.setState({
          reactant_options: [...new Set(reactants)],
        });
      });
    }

    // Fetch Available Products
    if (blocked !== 'products' && this.state.products.label === 'any') {
      query = `{catapp(reactants: "~${this.state.reactants.value || ''}", products: "~", distinct: true) { edges { node { products } } }}`;
      axios.post(graphQLRoot, {
        query,
      }).then((response) => {
        let products = [];
        const product = (response.data.data.catapp.edges.map((elem) => JSON.parse(elem.node.products)));
        products = products.concat([].concat(...product));
        products = product.map((r) => ({ key: Object.keys(r).join(' + '), value: Object.keys(r).join(' + ') }));
        /* products = products.map((r) => ({ value: r, label: r.replace('star', '*') }));*/
        products.push({ label: 'any', value: '' });
        this.setState({
          product_options: [...new Set(products)],
        });
      });
    }
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
      this.updateOptions(name);
    };
  }
  resetForm() {
    this.setState(initialState);
    this.updateOptions('');
    this.props.receiveReactions([]);
    this.props.clearSystems();
  }
  submitForm() {
    this.props.clearSystems();
    this.setState({ loading: true });
    const filters = [];
    if (typeof this.state.surface.label !== 'undefined') {
      filters.push(`surfaceComposition: "~${this.state.surface.label}"`);
    }
    if (typeof this.state.facet.label !== 'undefined') {
      filters.push(`facet: "~${this.state.facet.label}"`);
    }
    if (typeof this.state.reactants.label !== 'undefined') {
      filters.push(`reactants: "~${this.state.reactants.label.replace('*', '').replace('any', '')}"`);
    }
    if (typeof this.state.products.label !== 'undefined') {
      filters.push(`products: "~${this.state.products.label.replace('*', '').replace('any', '')}"`);
    }

    const filterString = filters.join(', ');

    const query = {
      query: `query{catapp ( last: 500, ${filterString} ) {
  edges {
    node {
      id
      DFTCode
      DFTFunctional
      reactants
      products
      #Equation
      aseIds
      #reactantIds
      #productIds
      facet
      chemicalComposition
      reactionEnergy
      activationEnergy
      surfaceComposition
    }
  }
}}`,
    };
    axios.post(graphQLRoot, query).then((response) => {
      this.setState({
        loading: false,
      });
      this.props.submitSearch();
      this.props.receiveReactions(response.data.data.catapp.edges);
    }).catch(() => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    return (
      <div>
        <h2>Reactions</h2>

        <TermAutosuggest field="reactants" setSubstate={this.setSubstate} submitForm={this.submitForm} autofocus />
        <span style={{ flexGrow: 1, position: 'relative', float: 'left', display: 'inline-block', whiteSpace: 'nowrap', margin: 10 }} > {'⇄'} </span>
        <TermAutosuggest field="products" submitForm={this.submitForm} setSubstate={this.setSubstate} />
        <span style={{ flexGrow: 1, position: 'relative', float: 'left', display: 'inline-block', whiteSpace: 'nowrap', margin: 10 }} > {' '} </span>
        <TermAutosuggest field="surface" submitForm={this.submitForm} setSubstate={this.setSubstate} />
        <span style={{ flexGrow: 1, position: 'relative', float: 'left', display: 'inline-block', whiteSpace: 'nowrap', margin: 10 }} > {' '} </span>
        <TermAutosuggest field="facet" submitForm={this.submitForm} setSubstate={this.setSubstate} />
        <br />
        <br />
        <MButton raised onClick={this.submitForm} color="primary"><MdSearch /> Search </MButton>
        {this.state.loading ? <LinearProgress color="primary" /> : null }
      </div>
    );
  }
}

EnergiesPageInput.propTypes = {
  receiveReactions: PropTypes.func.isRequired,
  clearSystems: PropTypes.func.isRequired,
  submitSearch: PropTypes.func.isRequired,
};

EnergiesPageInput.defaultProps = {
};
