export default function ButtonComponent({children, click}){
    return (
        <button onClick={click} className="p-2 bg-green-300">{children}</button>
    );
}