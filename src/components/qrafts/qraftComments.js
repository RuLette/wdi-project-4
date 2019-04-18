import React from 'react'
import {Comment, Header} from 'semantic-ui-react'
import Auth from '../../lib/auth'
const moment = require('moment')

const QraftComments = ({ handleChange, handleCommentSubmit, handleDeleteComment, comment, commentText, currentUser }) => {
  return (
    <div>

      <Comment.Group>

        <Header as='h3' dividing>
        Comments
        </Header>
        <Comment>

          {comment.map((comment, i) => (
            <div key={i} className="comment">
              <Comment.Avatar src={comment.owner.profile_picture  ? comment.owner.profile_picture : 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'} />
              <Comment.Content>
                <Comment.Author as='a'>{comment.owner.username}</Comment.Author>
                <Comment.Metadata>
                  <p>{moment(comment.created_at).format('MMM Do YYYY')}</p>
                </Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
              </Comment.Content>
              {(comment.owner.id === Auth.getPayload().sub) &&
                <Comment.Content>
                  <div>
                    <button
                      className="ui mini basic button deletebutton"
                      onClick={() => handleDeleteComment(comment)}>Delete
                    </button>
                  </div>
                </Comment.Content>
              }
            </div>

          ))}
        </Comment>
      </Comment.Group>
      <form onSubmit={handleCommentSubmit}>
        <div>
          <textarea
            className="input"
            placeholder="Post a comment"
            name="content"
            cols="60"
            onChange={handleChange}
            value={commentText}
          />
        </div>
        <button className= "ui mini basic button">Comment</button>
      </form>
    </div>
  )
}

export default QraftComments
