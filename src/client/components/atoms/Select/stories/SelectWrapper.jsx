import React from 'react';
import Select from '../Select';

const SelectWrapper = () => {
  const options = ['Opt1', 'Opt2', 'Opt3', 'Opt4', 'Opt5'];
  const [value, setValue] = React.useState('');

  // Este useEffect es para confirmar la ejecución en el Storybook
  React.useEffect(
    () => { !value ? null : console.info(`Value seleccionado: ${value}`); }
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
