import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    passwordRecords: [],
    inputUrl: '',
    inputName: '',
    inputPassword: '',
    searchInput: '',
    showPassword: false,
  }

  deletePasswordRecord = id => {
    const {passwordRecords} = this.state
    const filteredPasswordRecords = passwordRecords.filter(e => e.id !== id)
    this.setState({passwordRecords: filteredPasswordRecords})
  }

  getSearchRecords = () => {
    const {passwordRecords, searchInput} = this.state
    return passwordRecords.filter(eachRecord =>
      eachRecord.url.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  onInputUrlChange = e => {
    this.setState({inputUrl: e.target.value})
  }

  onSearchChange = e => {
    this.setState({searchInput: e.target.value})
  }

  onInputNameChange = e => {
    this.setState({inputName: e.target.value})
  }

  onInputPasswordChange = e => {
    this.setState({inputPassword: e.target.value})
  }

  onCheckChange = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  addPasswordRecord = e => {
    e.preventDefault()
    const {inputUrl, inputName, inputPassword} = this.state
    const newPasswordRecord = {
      id: v4(),
      inputUrl,
      inputName,
      inputPassword,
    }
    this.setState(prevState => ({
      passwordRecords: [...prevState.passwordRecords, newPasswordRecord],
      inputUrl: '',
      inputName: '',
      inputPassword: '',
    }))
  }

  render() {
    const {showPassword} = this.state
    const searchResults = this.getSearchRecords()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="app-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo"
            />
          </div>
          <div className="password-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-sm-image"
            />
            <div className="form-container">
              <form className="card" onSubmit={this.addPasswordRecord}>
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onInputUrlChange}
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onInputNameChange}
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onInputPasswordChange}
                  />
                </div>
                <div className="btn-container">
                  <button
                    className="add-btn"
                    type="submit"
                    onClick={this.addPasswordRecord}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-lg-image"
            />
          </div>
        </div>

        <div className="card-container">
          <div className="card-responsive">
            <div className="password-header">
              <div className="header-title">
                <h1 className="password-header-title">Your Passwords</h1>
                <p className="results-count">{searchResults.length}</p>
              </div>
              <div className="search-container">
                <div className="search-icon-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-icon"
                  />
                </div>
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  onChange={this.onSearchChange}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                id="checkbox"
                onChange={this.onCheckChange}
              />
              <label htmlFor="checkbox" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {searchResults.length !== 0 ? (
              <ul className="passwords-list-container">
                {searchResults.map(eachRecord => (
                  <PasswordItem
                    key={eachRecord.id}
                    record={eachRecord}
                    deletePasswordRecord={this.deletePasswordRecord}
                    showPassword={showPassword}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords-title">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default PasswordManager
