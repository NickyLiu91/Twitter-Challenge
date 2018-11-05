import React from 'react'

export default class Tweet extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      real_name: this.props.tweet.real_name,
      message: this.props.tweet.message,
      id: this.props.tweet.id
    }
  }
  //
  handleAuthorChange = (event) => {
    this.setState({
      real_name: event.target.value
    })

  }

  handleMessageChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }


  update = (e) => {
    e.preventDefault()

    fetch(`http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${this.props.tweet.id}`, {
        method: 'PATCH',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            message: {
              real_name: this.state.real_name,
              message: this.state.message
            }
          })
        })
      .then(response => response.json())
  }

  deleter = () => {
    // debugger
    fetch(`http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/${this.props.tweet.id}`, {
          'method': "DELETE"
        })
  }

  render() {
    return (
      <form onSubmit={this.update}>
      <input type="text" name="author"  onChange={this.handleAuthorChange} value={this.state.real_name}/>
      <input type="text" name="message"  onChange={this.handleMessageChange} value={this.state.message}/>
      <button>Submit</button>
      <button onClick={this.deleter}>DELETE</button>
      </form>
    )
  }
}
