import './BasketStyle.css'
import FileBase64 from 'react-file-base64';
import axios from 'axios';
function Upload(props) {

  const { item, setItem, items, setItems } = props;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await createItem(item);

    setItems(items => [...items, result]);
  }


  const url = "http://localhost:9002/items";

  const createItem = async (item) => {
    try {
      console.log(item)
      const { data } = await axios.post(url, item);
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="blockCart col-1">
      <form action="" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Name of Product"
          className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4 mx-auto max-w-sm"
          onChange={e => setItem({ ...item, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price of Product"
          className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4 mx-auto max-w-sm"
          onChange={e => setItem({ ...item, price: e.target.value })}
        />
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setItem({ ...item, image: base64 })}
          className="w-full py-2 px-3 rounded-lg border-2 border-gray-300 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mx-auto"
        />


        <div className="right-align mt-4">
          <div className="buttonRow">
            <button className="checkoutButton px-6 py-3 rounded-full font-bold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-600">
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>


  );
}

export default Upload;
