export default function ModalComponent({hidden, setHidden, children}){

    if(hidden)
        return null;

    function modalHidden(event){
        if(event.target == event.currentTarget)
            setHidden(true);
    }

    return (
        <div className=" flex fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-35" onClick={(event) => modalHidden(event)}>
            <div className=" bg-white p-2 rounded-md m-auto">
                { children }
            </div>
        </div>
    )
}