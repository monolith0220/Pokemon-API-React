import "./card.css"

export const Cards = ({ pokemon }) => {
	console.log(pokemon)
  return (
	<div className='card'>
		<div className='cardImg'><img src={pokemon.sprites.front_default} /></div>
		<h3 className='cardName'>{pokemon.name}</h3>
		<ul>
			{pokemon.types.map((type, i) => {
				return (
					<li key={i}>{type.type.name}</li>
				)
			})}
		</ul>
		<div className='cardInfo'>
			<ul className='cardData'>
				<li>重さ：{pokemon.weight}</li>
				<li>高さ：{pokemon.height}</li>
				<li>アビリティ：{pokemon.abilities[0].ability.name}</li>
			</ul>
		</div>
	</div>
  )
}
