import React, {useState} from 'react'

const AddDumpster = ({onAddDumpster, addDumpstersErrorMessage}) => {

    const [size, setSize] = useState(0);

    console.log(size)
    console.log(addDumpstersErrorMessage)
  return (
    <div id= "add-dumpster">
        <form>
            <div className= 'inputs'>
                <div className="input">
                    <label htmlFor=""> Size: </label>
                    <input type="number"  value={size} onChange= { (e) => {setSize(e.target.value)}}min= "0" max= "100"/>
                </div>
                
            </div>
            
        <button type= "submit" onClick= { async (e) => {
            e.preventDefault();
            const addResponse = await onAddDumpster(size);
            if(addResponse === 'Success!') setSize(0);
        }}>Add Dumpster</button>
        </form>
    </div>
    
  )
}

export default AddDumpster;