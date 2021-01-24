import './filter-form.scss';
import React, {FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TypeFilter, CityFilter, Sort} from '../../const';
import {ActionCreator} from '../../store/actions';
import Selector from '../../store/selector';
import Select from '../select/select';

const FilterForm: FC<{}> = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(Selector.getFetchingStatus);
  const typeFilter = useSelector(Selector.getTypeFilter);
  const cityFilter = useSelector(Selector.getCityFilter);
  const sort = useSelector(Selector.getSort);

  const onTypeFilterChange = (typeFilter: string) => {
    dispatch(ActionCreator.setTypeFilter(typeFilter));
  };

  const onCityFilterChange = (cityFilter: string) => {
    dispatch(ActionCreator.setCityFilter(cityFilter));
  };

  const onSortChange = (sort: string) => {
    dispatch(ActionCreator.setSort(sort));
  };

  return (
    <form className="filter-form">

      <Select
        id="type"
        label="Type"
        value={typeFilter}
        options={Object.values(TypeFilter)}
        disabled={isFetching}
        onChange={onTypeFilterChange}/>

      <Select
        id="city"
        label="City"
        value={cityFilter}
        options={Object.values(CityFilter)}
        disabled={isFetching}
        onChange={onCityFilterChange}/>

      <Select
        id="sort"
        label="Sort"
        value={sort}
        options={Object.values(Sort)}
        disabled={isFetching}
        onChange={onSortChange}/>

    </form>
  );
};

export default FilterForm;
