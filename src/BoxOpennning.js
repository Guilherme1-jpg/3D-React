import React, { useState, useRef } from 'react';
import { a, useSpring } from 'react-spring';
import { Box } from '@react-three/drei';

function BoxWithOpening() {
  const boxRef = useRef();
  const [open, setOpen] = useState(false);

  const { rotation } = useSpring({
    rotation: open ? [0, Math.PI / 2, 0] : [0, 0, 0],
  });

  const handleBoxClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <a.group rotation={rotation} onClick={handleBoxClick}>
      <Box ref={boxRef} />
    </a.group>
  );
}

export default BoxWithOpening;
