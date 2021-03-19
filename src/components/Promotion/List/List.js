import React, { useState } from 'react'
import PromotionCard from '../Card/Card'
import useAPI from 'components/utils/useAPI'
import PromotionModal from '../Modal/Modal'
import './List.css'

const PromotionList = ({ loading, promotions, error, refetch }) => {
  const [promotionId, setPromotionId] = useState(null)
  const [deletePromotion, deletePromotionInfo] = useAPI({
    method: 'DELETE',
  })

  if (error) {
    return <div>Erro Encontrado.</div>
  }

  if (promotions === null || deletePromotionInfo.loading) {
    return <div>Carregando...</div>
  }

  if (promotions.length === 0) {
    return <div>Nenhum Resultado Encontrado.</div>
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          onClickComments={() => setPromotionId(promotion.id)}
          onClickDelete={async () => {
            await deletePromotion({
              url: `/promotions/${promotion.id}`
            })
            refetch()
          }}
        />
      ))}
      {loading && <div>Carregando mais promoções... </div>}
      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => setPromotionId(null)}
        />
      )}

    </div>
  )
}

export default PromotionList