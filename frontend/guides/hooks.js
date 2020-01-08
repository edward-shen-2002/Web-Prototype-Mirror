import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';

const handleCleanUp = () => {};

const fetchData = async (setState) => {
  setState({ newData: "new data" })
};

function App() {
  // const [ state, setState ] = useState(initialState);
  const [ appState, setAppState ] = useState({});
  const [ appState2, setAppState2 ] = useState({});

  const containerRef = useRef(null);

  // Called when application mounts
  useEffect(() => {
    // Usually async calls done here
    fetchData(setAppState);

    return () => {
      // Return is used to clean up or unsubscribe on unmount
      handleCleanUp();
    };
  });

  // Memoizes the value - usually done when calculation is heavy
  const heavyCalculation = useMemo(() => {
      // Heavy calculation
    }, 
    // Second parameter is the data used to determine whether recalculation should be done, if not specified it's always recalculated (you should not use useMemo for that case)
    [ appState ]
  );

  // Memoizes the function - Recalculates only when set parameters are changed (in this case, appState)
  const handleExpensiveFunction = useCallback(() => {
    // Heavy function - may take a while to return
  }, [ appState ]);

  return (
    <div className="App" ref={containerRef}>
      ...
    </div>
  );
}

export default App;
