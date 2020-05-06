import React from 'react';

export const useMountEffect = (func) => React.useEffect(func, []);
