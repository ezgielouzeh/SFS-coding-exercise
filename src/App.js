import React from "react";
import axios from "axios";
import "./App.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      idCounter: 11,
      creditorName: "",
      firstName: "",
      lastName: "",
      minPaymentPercentage: 0,
      balance: 0,
      total: 0,
      checkRowCount: 0
    };
    this.handleRemove = this.handleRemove.bind (this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
    this.handleCheckBoxAll = this.handleCheckBoxAll.bind(this);
  }
  async componentDidMount() {
    let res = await axios.get(
      "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json"
    );
    this.setState({ data: res.data });
  }
  handleCheckBoxAll(event) {
    console.log("ALL", event);
  }
  handleCheckBoxChange(event) {
    const filteredData = this.state.data.filter((row) => {
      return row.id === Number(event.target.name);
    });
    if (event.target.checked )  {
      this.setState({ checkRowCount: this.state.checkRowCount + 1 });
      this.setState({ total: this.state.total + filteredData[0].balance });
    } else {
      this.setState({ checkRowCount: this.state.checkRowCount - 1 });
      this.setState({ total: this.state.total - filteredData[0].balance });
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleAdd(event) {
    event.preventDefault();
    const creditorName = event.target["0"].value;
    const firstName = event.target["1"].value;
    const lastName = event.target["2"].value;
    const minPaymentPercentage = Number(event.target["3"].value);
    const balance = Number(event.target["4"].value);
    let dataToChange = this.state.data;
    let idFromState = this.state.idCounter + 1;
    const newObject = {
      id: idFromState,
      creditorName,
      firstName,
      lastName,
      minPaymentPercentage,
      balance,
    };
    this.setState({ idCounter: idFromState });
    dataToChange.push(newObject);
    this.setState({
      data: dataToChange,
    });
  }

  handleRemove () {
    let data = this.state.data;
    data.pop ();

    this.setState ({
      data: data,
    });
  }

  render() {
    return (
      <div className="App">
        <br />
        <table>
          <thead>
            <tr>
              <th>
                <input name="select_all" value="-1" type="checkbox" onChange={this.handleCheckBoxAll} />
              </th>
              <th>Creditor</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Min Pay%</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((row) => {
              return (
                <tr key={row["id"]}>
                  <td>
                    <input
                      type="checkbox"
                      name={row["id"]}
                      onChange={this.handleCheckBoxChange}
                    />
                  </td>
                  <td>{row["creditorName"]}</td>
                  <td>{row["firstName"]}</td>
                  <td>{row["lastName"]}</td>
                  <td>{row["minPaymentPercentage"]}</td>
                  <td>{row["balance"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <div>
            <div>
              <b>Total {this.state.total}</b>
            </div>
            <div>
              <div>
                <b>Total Row Count:{this.state.data.length}</b>
              </div>
              <div>
                <b>Check Row Count:{this.state.checkRowCount}</b>
              </div>
            </div>
          </div>
          <div>
          <button type="button" onClick={this.handleRemove}>Remove</button>
          </div>
        </div>
        <br />
        <br />
        <div>
          <form onSubmit={this.handleAdd}>
            <label>
              Creditor:
              <input
                type="text"
                name="creditorName"
                value={this.state.creditor}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Min Pay%:
              <input
                type="text"
                name="minPaymentPercentage"
                value={this.state.minPaymentPercentage}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <label>
              Balance:
              <input
                type="text"
                name="balance"
                value={this.state.balance}
                onChange={this.handleChange}
              />
            </label>
            <br />
            <input type="submit" value="Add Debit" />
          </form>
        </div>
      </div>
    );
  }
}
export default App;
