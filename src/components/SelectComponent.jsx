export default function SelectComponent({change, list, value, classCss}){
  return(
    <select onChange={change} className={` text-red-600 active:outline-none p-1 border-2 border-solid border-gray-200 rounded-md ${classCss}`} value={value}>
      {list.map((item, index) => {
        return (
        <option key={item.value} value={item.value}>{item.label}</option>
      )})}
    </select>
  )
}