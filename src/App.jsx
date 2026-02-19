import { useEffect, useState } from 'react'
import SelectComponent from './components/SelectComponent';
import ButtonComponent from './components/ButtonComponent';
import ModalComponent from './components/ModalComponent';
import InputComponent from './components/InputComponent';
import useUsers from './features/users/UserHooks';

function App() {
  const {users, loading, limit, currentPage, sort, filter, setFilter, personalUser, setPersonalUser, nextPage, pastPage, changeSelectValue} = useUsers();
  const [modalHidden, setModalHidden] = useState(true);

  const listSort = [
    { value: 'asc', label: '↑' },
    { value: 'desc', label: '↓' },
    { value: 'none', label: '-' }
  ];
  const listFilter = [
    { value: 'lastName', label: 'фамилия' },
    { value: 'firstName', label: 'имя' },
    { value: 'maidenName', label: 'отчество' },
    { value: 'age', label: 'возраст' },
    { value: 'gender', label: 'пол' },
    { value: 'phone', label: 'номер телефона' },
    { value: 'email', label: 'Электронная почта' },
    { value: 'address.country', label: 'страна' },
    { value: 'address.city', label: 'город' },
  ];
  function modalPersonalUser(user){
    setPersonalUser((prev) => ({
      ...prev,
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      maidenName: user.maidenName,
      age: user.age,
      address: user.address,
      height: user.height,
      weight: user.weight,
      phone: user.phone,
      email: user.email,
      image: user.image,
    }));
    setModalHidden(false);
  };
  return (
    <main className='py-5 container max-w-[1400px] mx-auto'>
      <div className=' my-5 flex items-center gap-2'>
        <SelectComponent change={(e)=> {
          setFilter((prev)=>({
            ...prev,
            key: e.target.value
          }));
        }} list={listFilter} defaultListValue={filter.key} />
        <InputComponent classCss="w-72" placeHolder='Введите значение для фильтрации' type="text" input={(e)=> {
          setFilter((prev)=>({
            ...prev,
            value: e.target.value
          }));
        }} />
      </div>

      { loading ? <LoadSpinComponent /> : <TableComponent listSort ={listSort} users ={users} limit ={limit} currentPage ={currentPage} sort ={sort} nextPage ={nextPage} pastPage ={pastPage} changeSelectValue ={changeSelectValue} modalPersonalUser={modalPersonalUser} />}

      <ModalComponent hidden={modalHidden} setHidden={setModalHidden}>
        <div className=' flex flex-row gap-3'>
          <img className='max-w-32 max-h-32 rounded-xl' src={personalUser.image} alt={`avatar user ${personalUser.firstName}`} />
          <div>
            <p className="text-lg">ИМЯ: <strong className='font-semibold text-black mt-4'>{`${personalUser.lastName} ${personalUser.firstName} ${personalUser.maidenName}`}</strong></p>
            <p className="text-lg">ВОЗРАСТ: <strong className='font-semibold text-black mt-4'>{personalUser.age}</strong></p>
            <p className="text-lg">НОМЕР ТЕЛЕФОНА: <strong className='font-semibold text-black mt-4'>{personalUser.phone}</strong></p>
            <p className="text-lg">ПОЧТА: <strong className='font-semibold text-black mt-4'>{personalUser.email}</strong></p>
            <p className="text-lg">РОСТ: <strong className='font-semibold text-black mt-4'>{personalUser.height}</strong></p>
            <p className="text-lg">ВЕС: <strong className='font-semibold text-black mt-4'>{personalUser.weight}</strong></p>
          </div>
        </div>
        <table className=' table-auto border-collapse border mt-3 w-full'>
          <thead className=' bg-gray-200'>
            <tr>
              <td className=' p-2 border border-gray-400'>Адресс</td>
              <td className=' p-2 border border-gray-400'>Город</td>
              <td className=' p-2 border border-gray-400'>Штат</td>
              <td className=' p-2 border border-gray-400'>postalCode</td>
              <td className=' p-2 border border-gray-400'>Страна</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=' p-2 border border-gray-400'>{personalUser.address.address}</td>
              <td className=' p-2 border border-gray-400'>{personalUser.address.city}</td>
              <td className=' p-2 border border-gray-400'>{personalUser.address.state}</td>
              <td className=' p-2 border border-gray-400'>{personalUser.address.postalCode}</td>
              <td className=' p-2 border border-gray-400'>{personalUser.address.country}</td>
            </tr>
          </tbody>
        </table>
        <div>
          
        </div>
      </ModalComponent>
    </main>
  )
}

function TableComponent({listSort, users, limit, currentPage, sort, nextPage, pastPage, changeSelectValue, modalPersonalUser}){
  return (
    <>
      <table className=' table-auto border-collapse border w-full max-w-[1400px]'>
        <thead>
          <tr>
            <td className=' p-2 border border-gray-700'>
              фамилия 
              <SelectComponent classCss="ml-2" change={(e) => changeSelectValue('lastName', e.target.value)} value={sort.field === 'lastName' ? sort.order : 'none'} list={listSort} />
            </td>

            <td className=' p-2 border border-gray-700'>
              имя 
              <SelectComponent classCss="ml-2" change={(e) => changeSelectValue('firstName', e.target.value)} value={sort.field === 'firstName' ? sort.order : 'none'} list={listSort} />
            </td>

            <td className=' p-2 border border-gray-700'>
              отчество 
              <SelectComponent classCss="ml-2" change={(e) => changeSelectValue('maidenName', e.target.value)} value={sort.field === 'maidenName' ? sort.order : 'none'} list={listSort} />
            </td>

            <td className=' p-2 border border-gray-700'>
              возраст
              <SelectComponent classCss="ml-2" change={(e) => changeSelectValue('age', e.target.value)} value={sort.field === 'age' ? sort.order : 'none'} list={listSort} />
            </td>

            <td className=' p-2 border border-gray-700'>
              пол
              <SelectComponent classCss="ml-2" change={(e) => changeSelectValue('gender', e.target.value)} value={sort.field === 'gender' ? sort.order : 'none'} list={listSort} />  
            </td>

            <td className=' p-2 border border-gray-700'>
              номер телефона
              <SelectComponent classCss="ml-2" change={(e) => changeSelectValue('phone', e.target.value)} value={sort.field === 'phone' ? sort.order : 'none'} list={listSort} /> 
            </td>

            <td className=' p-2 border border-gray-700'>email</td>
            <td className=' p-2 border border-gray-700'>страна</td>
            <td className=' p-2 border border-gray-700'>город</td>
          </tr>
        </thead>
        <tbody>
          {users?.users?.map(user => {
            return(
              <tr className=' cursor-pointer hover:bg-slate-200' key={user.id} onClick={() => modalPersonalUser(user)}>
                <td className=' p-2 border border-gray-700'>{user.lastName}</td>
                <td className=' p-2 border border-gray-700'>{user.firstName}</td>
                <td className=' p-2 border border-gray-700'>{user.maidenName}</td>
                <td className=' p-2 border border-gray-700'>{user.age}</td>
                <td className=' p-2 border border-gray-700'>{user.gender}</td>
                <td className=' p-2 border border-gray-700'>{user.phone}</td>
                <td className=' p-2 border border-gray-700'>{user.email}</td>
                <td className=' p-2 border border-gray-700'>{user.address.country}</td>
                <td className=' p-2 border border-gray-700'>{user.address.city}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
      <div className='flex justify-end items-center my-5'>
        <ButtonComponent click={pastPage}>back</ButtonComponent>
        <p className='mx-5'>{currentPage} / {Math.ceil(users.total / limit)}</p>
        <ButtonComponent click={nextPage}>next</ButtonComponent>
      </div>
    </>
  )
}

function LoadSpinComponent(){
  return(
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      Загрузка таблицы
    </div>
  )
}

export default App