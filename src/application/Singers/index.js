import React, { useState } from 'react'
import HorizenItem from '../../baseUI/HorizenItem'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'


function Singers() {
	const [category, setCategory] = useState('')
	const [alpha, setAlpha] = useState('')

	const handleUpdateAlpha = (val) => {
		setAlpha(val)
	}

	const handleUpadateCatetory = (val) => {
		setCategory(val)
	}

	return (
		<NavContainer>
			<HorizenItem
				list={categoryTypes}
				title="分类 (默认热门)："
				handleClick={handleUpadateCatetory}
				oldVal={category}
			></HorizenItem>
			<HorizenItem
				list={alphaTypes}
				title="首字母："
				handleClick={handleUpdateAlpha}
				oldVal={alpha}
			></HorizenItem>
		</NavContainer>
			
	)
}

export default React.memo(Singers)

