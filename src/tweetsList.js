import React from 'react'
import Tweet from './tweet.js'

export default class TweetsList extends React.Component {


  constructor() {
    super()
    this.state = {
      tweets: []
    }
  }

  fetchStuff = () => {
    fetch('http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages')
    .then(response => response.json())
    .then(response => {
      this.setState({
        tweets: response
      })
    })
  }

  componentDidMount(){
    this.fetchStuff()
  }

  generateTweets = () => {
    console.log(this.state.tweets)
    const tweets = this.state.tweets.map(tweet =><Tweet key={tweet.id}
      tweet={tweet}
      />

    )
    return tweets
  }

  post = (event) => {
    const self = this
    event.preventDefault()

    fetch('http://fetch-message-in-the-bottle.herokuapp.com/api/v2/messages/', {
        method: 'POST',
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(
          {
            message: {
              real_name: this.refs.author.value,
              message: this.refs.message.value
            }
          })
        })
      .then(response => response.json())
      .then(this.fetchStuff)

  }

  render() {
    const tweetsToDisplay = this.generateTweets()
    debugger
    return(
      <div>
        <h1>CREATE NEW TWEET</h1>
        <form onSubmit={this.post}>
          <input type="text" ref="author" />
          <input type="text" ref="message" />
          <button>Submit</button>
        </form>

        <h1>{tweetsToDisplay}</h1>
      </div>

    )
  }
}
