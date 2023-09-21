import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { FormGroup, Label } from 'reactstrap';
import { useGetHeroesQuery } from '../../hooks/useHero';

type TOption = {
  value: string;
  label: string;
};

const CustomOption = ({ innerProps, data: { value, label } }: { innerProps: any; data: TOption }) => (
  <div {...innerProps}>
    <Link to={`/heroes/${value}`}>{label}</Link>
  </div>
);

export const Search: FC = () => {
  const { data, isLoading, isError } = useGetHeroesQuery();
  const options = useMemo(() => data?.map(({ id, name }) => ({ value: id, label: name })), [data]) || [];

  return (
    <FormGroup>
      <Label for="select">Hero Search</Label>
      {isLoading && <span>fetching a character...</span>}
      {isError && <span>Ups! it was an error 🚨</span>}
      {data && (
        <Select
          options={options}
          id="select"
          components={{
            Option: CustomOption,
          }}
        />
      )}
    </FormGroup>
  );
};
