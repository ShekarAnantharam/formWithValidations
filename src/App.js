import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserForm />
        <UserTable />
      </div>
    </Provider>
  );
}

export default App;
