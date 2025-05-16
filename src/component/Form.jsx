import React, { useEffect, useRef, useState } from "react";

const Form = () => {
  const [employee, setEmployee] = useState({});
  const [empData, setEmpData] = useState([]);
  const [role, setRole] = useState([]);
  const [editId, setEditId] = useState(null);
  const btnSubmit = useRef();
  const ename = useRef();

  // -------- U S E - E F F E C T ------------

  useEffect(() => {
    let oldEmpList = JSON.parse(localStorage.getItem("empData")) || [];
    setEmpData(oldEmpList);
  }, []);

  //   ------ H A N D L E - C H A N G E ---------

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "role") {
      let newRole = [...role];

      if (checked) {
        newRole.push(value);
      } else {
        newRole = newRole.filter((val) => val != value);
      }

      setRole(newRole);
      setEmployee((prev) => ({ ...prev, role: newRole }));
      return;
    }

    let newData = { ...employee, [name]: value };
    setEmployee(newData);
  };

  //  -------- H A N D L E - S U B M I T -----------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId === null) {
      let newData = [...empData, { ...employee, id: Date.now() }];
      setEmpData(newData);
      localStorage.setItem("empData", JSON.stringify(newData));

    } else {
      let data = empData.map((val) => {
        if (val.id === editId) {
          val = employee;
        }
        return val;
      });

      localStorage.setItem("empData", JSON.stringify(data));
      setEmpData(data);
      setEditId(null);
      btnSubmit.current.classList.remove("btn-success");
      btnSubmit.current.innerText = "Submit";
      btnSubmit.current.classList.add("btn-primary");
    }

    setEmployee({});
    setRole([]);
    ename.current.focus();
  };

  // --------- H A N D L E - D E L E T E ----------

  const handleDelete = (id) => {
    let deleteData = empData.filter((val) => val.id !== id);
    localStorage.setItem("empData", JSON.stringify(deleteData));
    setEmpData(deleteData);
  };

  // ---------- H A N D L E - E D I T ---------------

  const handleEdit = (id) => {
    let editData = empData.filter((val) => val.id === id)[0];
    setEmployee(editData);
    setEditId(id);
    btnSubmit.current.classList.add("btn-success");
    btnSubmit.current.innerText = "Update";
    btnSubmit.current.classList.remove("btn-primary");
    ename.current.focus();
  };

  return (
    <>
      <section className="form-section d-flex justify-content-center my-5">
        <form
          method="post"
          className="p-4 rounded-3 border"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="employeeName" className="form-label fw-semibold">
              Employee name
            </label>
            <input
              className="form-control"
              type="text"
              id="employeeName"
              name="ename"
              value={employee.ename || ""}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="Salary" className="form-label fw-semibold">
              Employee Salary
            </label>
            <input
              className="form-control"
              type="number"
              id="Salary"
              name="salary"
              min={10000}
              max={40000}
              value={employee.salary || ""}
              onChange={handleChange}
            />
          </div>

          {/* ----------- C H E C K - B O X --------- */}

          <label className="form-label me-3 fw-semibold">Department: </label>
          <div className="mb-3 form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="role"
              value="HR"
              onChange={handleChange}
              checked={role.includes("HR") ? true : false}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              HR
            </label>
          </div>

          <div className="mb-3 form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck2"
              name="role"
              value="Developer"
              onChange={handleChange}
              checked={role.includes("Developer") ? true : false}
            />
            <label className="form-check-label" htmlFor="exampleCheck2">
              Developer
            </label>
          </div>

          <div className="mb-3 form-check form-check-inline">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck3"
              name="role"
              value="Tester"
              onChange={handleChange}
              checked={role.includes("Tester") ? true : false}
            />
            <label className="form-check-label" htmlFor="exampleCheck3">
              Tester
            </label>
          </div>

          {/* -------------- R A D I O - B U T T O N -------------- */}

          <div className="my-3">
            <label className="form-label me-3 fw-semibold">Gender: </label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                onChange={handleChange}
                value="Male"
                checked={employee.gender == "Male"}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                onChange={handleChange}
                value="Female"
                checked={employee.gender == "Female"}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>

          {/* --------- C I T Y - F O R M ---------- */}

          <div className="mb-3">
            <label className="form-label fw-semibold">City:</label>
            <select
              name="city"
              onChange={handleChange}
              className="form-select"
              value={employee.city || ""}
            >
              <option disabled={employee.city && true} selected>
                ---- Select City -----
              </option>
              <option selected={employee.city ? true : false} value="Navsari">
                Navsari
              </option>
              <option selected={employee.city ? true : false} value="Mumbai">
                Mumbai
              </option>
              <option selected={employee.city ? true : false} value="Rajkot">
                Rajkot
              </option>
              <option selected={employee.city ? true : false} value="Daman">
                Daman
              </option>
              <option selected={employee.city ? true : false} value="Surat">
                Surat
              </option>
            </select>
          </div>

          {/* ----------- A D D R E S S - T E X T A R E A ----------- */}

          <div className="mb-3">
            <textarea
              className="w-100 rounded p-3"
              name="address"
              id="address"
              onChange={handleChange}
              value={employee.address || ""}
              placeholder="Enter Your Address"
            ></textarea>
          </div>

          {/* -------- S U B M I T - B U T T O N ---------- */}

          <button type="submit" ref={btnSubmit} className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>

      <section className="container py-5">

        {/* ---------- T A B L E - S E C T I O N ----------- */}

        <table className="table  table-striped">
          <caption className="caption-top fw-bold fs-1">Employee Data</caption>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Employee</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Gender</th>
              <th>City</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {empData.map((value, index) => {
              const { id, ename, salary, gender, city, address } = value;
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{ename}</td>
                  <td>₹ {salary}</td>
                  <td>{value.role ? value.role.toString() : []}</td>
                  <td>{gender}</td>
                  <td>{city}</td>
                  <td>{address}</td>
                  <td>
                    <button
                      className="btn btn-danger me-3"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Form;
