import React from 'react';
import { connect } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { MyContext } from '../../context';

import './style.css';


interface Store {
  beersReducer: BeersReducer
}

interface BeersReducer {
  beers: Data[]
}

interface Volume {
  value: number
  unit: string
}

interface Boil_Volume {
  value: number
  unit: string
}

interface Temp {
  value: number
  unit: string
}

interface Mash {
  temp: Temp
  duration: number
}

interface Fermentation {
  temp: Temp
}

interface Method {
  mash_temp: Mash[]
  fermentation: Fermentation
  twist?: any
}

interface Amount {
  value: number
  unit: string
}

interface Malt {
  name: string
  amount: Amount
}

interface Hoops {
  name: string
  amount: Amount
  add: string
  attribute: string
}

interface Ingredients {
  malt: Malt[]
  hops: Hoops[]
  yeast: string
}

export interface Data {
  id: number
  name: string
  tagline: string
  first_brewed: string
  description: string
  image_url: string
  abv: number
  ibu: number
  target_fg: number
  target_og: number
  ebc: number
  srm: number
  ph: number
  attenuation_level: number
  volume: Volume
  boil_volume: Boil_Volume
  method: Method
  ingredients: Ingredients
  food_pairing: string[]
  brewers_tips: string
  contributed_by: string
}

interface Props {
  dispatch: (i: { type: string; }) => void;
  data: Data[];
}

interface State {
  open?: boolean;
  activeEl?: any;
  form?: any;
  dataBeers?: any;
}

class MainTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      activeEl: {},
      form: {},
      dataBeers: [],
    };
  };

  componentDidMount() {
    // for saga
    // const getBeers = () => this.props.dispatch(fetchBeers())
    // getBeers()
  };

  deleteProduct(items: Data) {
    const removeItem = this.context.state.data.filter((el: any) => el.id !== items.id)
    this.context.state.handleEditTable(removeItem)
  }

  closeModal() {
    this.setState({open: false})
  }

  selectProduct(item: Data) {
    const selectProduct = this.context.state.data.find((el: any) => el.id === item.id)
    this.setState({open: true})
    this.setState({activeEl: selectProduct})
  }

  changeSaveHandler(e: any) {
    const key = e.target.getAttribute('name')
    this.setState((prevState: State) => ({
      activeEl: {
        ...prevState.activeEl,
        [key]: e.target.value
      }
    }))
  };

  handleEditBeer(): any {
    const newData = this.context.state.data.filter((el: any) => el.id !== this.state.activeEl.id)
    const newNewData = [...newData, this.state.activeEl]
    const sortedArray = newNewData.sort(function (obj, obj2) {
      return obj.id - obj2.id
    });
    this.context.state.handleEditTable(sortedArray)
    this.setState({open: false})
  }

  render() {
    const editInputs = [
      {
        type: 'text',
        id: Date.now(),
        placeholder: 'Name',
        handler: 'name',
        value: this.state.activeEl.name
      },
      {
        type: 'text',
        id: Date.now(),
        placeholder: 'Tagline',
        handler: 'tagline',
        value: this.state.activeEl.tagline
      },
      {
        type: 'text',
        id: Date.now(),
        placeholder: 'Abv',
        handler: 'abv',
        value: this.state.activeEl.abv
      },
      {
        type: 'text',
        id: Date.now(),
        placeholder: 'Ibu',
        handler: 'ibu',
        value: this.state.activeEl.ibu
      },
      {
        type: 'text',
        id: Date.now(),
        placeholder: 'Attenuation Level',
        handler: 'attenuation_level',
        value: this.state.activeEl.attenuation_level
      },
      {
        type: 'text',
        id: Date.now(),
        placeholder: 'Brewers Tips',
        handler: 'brewers_tips',
        value: this.state.activeEl.brewers_tips
      },
    ]

    return (
      <MyContext.Consumer>
        {(context) => (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Tagline</TableCell>
                  <TableCell align="right">First brewed</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Abv</TableCell>
                  <TableCell align="right">Ibu</TableCell>
                  <TableCell align="right">Attenuation Level</TableCell>
                  <TableCell align="center">Brewers Tips</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.context.state.data.map((item: Data) => (
                  <TableRow
                    key={item.name}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.tagline}</TableCell>
                    <TableCell align="right">{item.first_brewed}</TableCell>
                    <TableCell align="right"><img src={item.image_url} alt={item.name}/></TableCell>
                    <TableCell align="right">{item.abv}</TableCell>
                    <TableCell align="right">{item.ibu}</TableCell>
                    <TableCell align="right">{item.attenuation_level}</TableCell>
                    <TableCell align="right">{item.brewers_tips}</TableCell>
                    <TableCell align="right">
                      <div className='button'>
                        <button className='editButton' onClick={() => this.selectProduct(item)}>
                          {context.state.edit}
                        </button>
                        <button className='delButton' onClick={() => this.deleteProduct(item)}>
                          {context.state.del}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {this.state.open ?
              (
                <div className="wrapper">
                  <div className="modal">
                    <div className="modal-title">
                      Edit Beer
                    </div>
                    <div className='close' onClick={() => this.closeModal()}>
                      X
                    </div>
                    {editInputs.map((item: any, index) => {
                      return (
                        <div className="modal-input-wrap" key={index + 44}>
                          <span>{item.placeholder}</span>
                          <input
                            onChange={(e) => this.changeSaveHandler(e)}
                            placeholder={item.placeholder}
                            type={item.type}
                            name={item.handler}
                            value={item.value}
                          />
                        </div>
                      )
                    })}
                    <button className='modal-button' onClick={() => this.handleEditBeer()}>Save changes</button>
                  </div>
                </div>
              ) : null}
          </TableContainer>
        )}
      </MyContext.Consumer>
    );
  };
}

MainTable.contextType = MyContext

const mapStateToProps = (store: Store) => {
  return {
    data: store.beersReducer.beers
  }
};

export default connect(mapStateToProps)(MainTable)
