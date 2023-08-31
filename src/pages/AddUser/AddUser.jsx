import "./AddUser.css";
export default function AddUser() {
  return (
    <div className="container my-5">
      <div className="title text-center">
        <h2>Add User</h2>
      </div>
      <form className="addUserForm mt-5">
        <div className="row">
          {/* MSID FIELD*/}
          <div className="col-md-4 mb-4">
            <div className="row gx-3 align-items-center">
              <label className="label">MSID</label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="LJKSHSD"
                />
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary">
                  CHECK
                </button>
              </div>
            </div>
          </div>
          
          {/* NAME FIELD*/}
          <div className="col-md-4 mb-4">
            <div className="mb-3">
              <label>NAME</label>
              <input
                type="text"
                className="form-control"
                placeholder="PETERPARKER"
              />
            </div>
          </div>

          {/* NAME FIELD*/}
          <div className="col-md-4">
            <div className="mb-3">
              <label>NAME</label>
              <input
                type="text"
                className="form-control"
                placeholder="PETERPARKER"
              />
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
