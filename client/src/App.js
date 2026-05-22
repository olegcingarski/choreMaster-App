import logo from './logo.svg';
import './App.css';


const categories = [{ id: 1, name: 'Cooking' },
  { id: 2, name: 'Cleaning and Gardening' },
  { id: 3, name: 'Laundry' },
  { id: 4, name: 'Pet' }]

function list() {
  return categories.map((item) => {
    return(
      <div key={item.id}>
        {item.name}
      </div>
    )
  })
}

function App() {
  return(
    <div className='App'>
      <h1>List</h1>
      {list()}
    </div>
  )

}

export default App;
