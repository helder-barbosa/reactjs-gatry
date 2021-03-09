import React from 'react'
import PromotionCard from '../Card/Card'
import './List.css'

const PromotionList = ({ loading, promotions, error }) => {
  if (error) {
    return <div>Erro Encontrado.</div>
  }

  if (loading || promotions === null) {
    return <div>Carregando...</div>
  }

  if (promotions.length === 0) {
    return <div>Nenhum Resultado Encontrado.</div>
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionCard promotion={promotion} />
      ))}
    </div>
  )
}

export default PromotionList