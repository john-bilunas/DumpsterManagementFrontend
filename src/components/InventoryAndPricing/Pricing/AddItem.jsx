import React,{useState} from 'react'

const AddItem = ({allItemCategoriesList, onAddItem}) => {

        const [categoryId, setCategoryId] = useState(undefined);
        const [name, setName] = useState();
        const [price, setPrice] = useState();
        const [current, setCurrent] = useState(true);

        const categoryOptions = allItemCategoriesList.map( (cat) => {
          return (<option value={cat.id} >{cat.type}</option>);
        });
        // name, price, current, category_id

        console.log({name, price, current, categoryId})
        return (
          <div className= "add-form">
              <form id= "add-item">
                {/* name, price, current, category_id */}
                  <div className= 'inputs'>
                    <div className="input">
                      <label htmlFor="category"> Category: </label>
                      <select name="category" id="category" onChange={(e) => { setCategoryId(e.target.value); }}>
                      <option>Please select a category...</option>
                        {categoryOptions}
                      </select>
                    </div>
                    <div className="input">
                      <label htmlFor="name"> Name: </label>
                      <input type="text" id= 'name' value={name} name= 'name' onChange= { (e) => {setName(e.target.value)}}/>
                    </div>
                    <div className="input">
                      <label htmlFor="price"> Price: </label>
                      <input type="number" id= 'price' value={price} name= 'price' onChange= { (e) => {setPrice(e.target.value)}}/>
                    </div>

                  </div>
                  <button type= "submit" onClick= { async (e) => {
                      e.preventDefault();
                      const addResponse = await onAddItem({name, price, current, category_id: categoryId});
                      if(addResponse === 'Success!'){
                        //reset state
                        setName('');
                        setPrice('');
                      }
                  }}>Add Dumpster</button>
                  
              {/* <button type= "submit" onClick= { async (e) => {
                  e.preventDefault();
                  const addResponse = await onAddDumpster(size);
                  if(addResponse === 'Success!') setSize(0);
              }}>Add Dumpster</button> */}
              </form>
          </div>
          
        )
}

export default AddItem;