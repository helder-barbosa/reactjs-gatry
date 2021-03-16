import React, { useState } from 'react'
import PromotionCard from '../Card/Card'
import PromotionModal from '../Modal/Modal'
import './List.css'

const PromotionList = ({ loading, promotions, error }) => {
  const [promotionId, setPromotionId] = useState(null)
  if (error) {
    return <div>Erro Encontrado.</div>
  }

  if (promotions === null) {
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