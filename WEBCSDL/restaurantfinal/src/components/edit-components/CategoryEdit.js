import '../../style/pos-style.css'

function CategoryEdit(){
    return (
        <div id="add-category" className="add-category">
            <div className="add-header">
                <i className="fa-solid fa-inbox" />
                Create Details
            </div>
            <div className="add-body">
                <div className="add-name">
                <label htmlFor="">Name</label>
                <input type="text" placeholder="Enter Category Name" />
                </div>
                <div className="add-img">
                <input type="file" name="" id="" />
                </div>
            </div>
            <div className="add-footer">
                <button className="button-17 add-close" role="button">
                Cancel
                </button>
                <button className="button-17 add-close" role="button">
                Save
                </button>
            </div>
        </div>

    )
}
export default CategoryEdit