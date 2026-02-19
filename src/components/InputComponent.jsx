export default function InputComponent({input, placeHolder, type="text", classCss}){

    function fieldInput(data){
        input(data);
    }

    return(
        <input className={` focus:outline-none p-1 border-2 border-solid border-gray-200 rounded-md ${classCss}`} placeholder={placeHolder} type={type} onInput={fieldInput} />
    )
}