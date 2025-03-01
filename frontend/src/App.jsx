import Header from './components/headers/Header'
import Page from "./components/mainpages/Page"
import { DataProvider } from './GlobalState'


const App = () => {
  return (
    <DataProvider>
    <div className='App'>
      <Header></Header>
      <Page></Page>
    </div>
    </DataProvider>
  )
}

export default App
