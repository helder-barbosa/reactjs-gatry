import React, { useEffect, useState } from 'react'
import UIModal from 'components/UI/Modal/Modal'
import useAPI from 'components/utils/useAPI'
import PromotionModalCommentsTree from './CommentsTree/CommentsTree'
import './Modal.css'

const PromotionModal = ({ promotionId, onClickClose }) => {
  const [comment, setComment] = useState('')

  const [load, loadInfo] = useAPI({
    url: '/comments',
    params: {
      promotionId,
      _expand: 'user'
    }
  })

  const [sendComment, sendCommentInfo] = useAPI({
    url: '/comments',
    method: 'POST'
  })

  useEffect(() => {
    load()
  }, [])

  async function onSubmit(ev) {
    ev.preventDefault()
    try {
      sendComment({
        data: {
          userId: 1,
          promotionId,
          comment
        }
      })
      setComment('')
      load({ quietly: true })
    } catch (e) {
    }
  }

  async function sendAnswer(text, parentId) {
    sendComment({
      data: {
        userId: 1,
        promotionId,
        comment: text,
        parentId
      }
    })
    load({ quietly: true })
  }

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
        <textarea
          placeholder="Comentário..."
          onChange={(ev) => setComment(ev.target.value)}
          value={comment}
          disabled={sendCommentInfo.loading}
        />
        <button type="submit" disabled={sendCommentInfo.loading}>
          {sendCommentInfo.loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      <PromotionModalCommentsTree
        comments={loadInfo.data}
        sendComment={sendAnswer} />
    </UIModal>
  )
}

export default PromotionModal