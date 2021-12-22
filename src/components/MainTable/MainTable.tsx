import React from 'react';
import { connect } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { fetchBeers } from '../../redux/store/apiReducer';

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

interface Data {
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

class MainTable extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: []
    };
  };

  componentDidMount(): void {
    const getBeers = () => this.props.dispatch(fetchBeers())
    getBeers()
  };

  render() {
    return (
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
              <TableCell align="right">Volume(litres)</TableCell>
              <TableCell align="right">Brewers Tips</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.data.map((item: Data) => (
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
                <TableCell align="right">{item.boil_volume.value}</TableCell>
                <TableCell align="right">{item.brewers_tips}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
}

const mapStateToProps = (store: Store) => {
  return {
    data: store.beersReducer.beers
  }
};

export default connect(mapStateToProps)(MainTable)