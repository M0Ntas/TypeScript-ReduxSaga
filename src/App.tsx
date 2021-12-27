import React from 'react';

import axios from 'axios';
import MainTable, { Data } from './components/MainTable/MainTable';

import { MyContext } from './context';

interface State {
  def?: string
  del?: string
  edit?: string
  test?: number
  data?: Data[],
  handleEditTable?: any, // help
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      del: 'DEL',
      edit: 'EDIT',
      test: 123,
      data: [],
      handleEditTable: this.editTable
    }
  }
  
  componentDidMount() {
    axios.get('https://api.punkapi.com/v2/beers')
      .then(res => {
        const response = res.data
        this.setState({data: response})
      })
  }

  editTable = (newData: Data[]) => this.setState({data: newData})

  render() {
    return (
      <MyContext.Provider value={{state: this.state}}>
        <MainTable/>
      </MyContext.Provider>
    );
  }
}

export default App;
