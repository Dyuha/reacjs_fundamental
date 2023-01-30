import { MyInput } from './UI/input/MyInput';
import { MySelect } from './UI/select/MySelect';


export const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
    <MyInput onChange={ e => setFilter({...filter, query: e.target.value})} 
             value={filter.query} 
             placeholder="Поиск"/>
    <MySelect
      defaultValue="Сортировка по"
      value={filter.sort}
      onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
      options={[
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ]}
    />
  </div>
  )
};