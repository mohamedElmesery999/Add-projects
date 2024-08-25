import { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

export default function NewProject({onAdd , onCancel}){

    const modal =useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef(); 

    function handleSave(){

        const enteredTitle = title.current.value
        const enteredDescription = description.current.value
        const enteredDueData = dueDate.current.value

        if(enteredTitle.trim() === '' || enteredDescription.trim()==='' || enteredDueData.trim()===''){

            modal.current.open();
            return;
        }
    
    onAdd({
        title : enteredTitle ,
        description : enteredDescription ,
        dueDate : enteredDueData
    })
}

    return(
        <>
        <Modal ref={modal} buttonCaption="Okay">
            <h2 className="text-xl font-bold text-stone-700 my-4"> Invalid Input </h2>
            <p className="text-stone-500 mb-4">Oopes..looks like you forgot to enter a value.</p>
            <p className="text-stone-500 mb-4">please make sure you provide a valid value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">

                <li><button className="px-2 by-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button></li>
                <li><button className="text-stone-800 hover:text-stone-950 " onClick={onCancel}>Cancel</button></li>

            </menu>
            <div>
                < Input type='text' ref={title} label="Title"/>
                < Input ref={description} label="Description" textarea />
                < Input type='date' ref={dueDate} label="Due Date"/>

            </div>
        </div>
        </>

    );
}