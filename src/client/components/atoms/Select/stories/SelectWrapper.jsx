import React from 'react';
import Select from '../Select';

const SelectWrapper = () => {
  const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
  const [value, setValue] = React.useState('');

  // Este useEffect es para confirmar la ejecución en el Storybook
  React.useEffect(
    () => { !value ? null : alert(`Value seleccionado: ${value}`); }
    , [value],
  );

  return (
    <div>
      <Select
        name='MyFiveOpts'
        id='id02'
        placeholder='Five Options'
        value={value}
        onChange={setValue}
        options={options}
      />
    </div>
  );
};

export default SelectWrapper;
