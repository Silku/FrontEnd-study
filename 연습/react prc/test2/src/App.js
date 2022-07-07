import React from 'react';
import Counter from './Counter';
import Button from './components/button';

function App() {
  return (
    <>
        <Counter/>
        <div className='buttons'>
             <Button>클릭하기 </Button>
        </div>
    </>

  );
}

export default App;
