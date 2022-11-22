import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BsDash } from 'react-icons/bs';

export default function PriceButton({ min, max, isOpen }) {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);
	const minValRef = useRef(min);
	const maxValRef = useRef(max);
	const range = useRef(null);

	// Convert to percentage
	const getPercent = useCallback(
		(value) => Math.round(((value - min) / (max - min)) * 100),
		[min, max],
	);

	// Set width of the range to decrease from the left side
	useEffect(() => {
		const minPercent = getPercent(minVal);
		const maxPercent = getPercent(maxValRef.current);

		if (range.current) {
			range.current.style.left = `${minPercent}%`;
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, getPercent]);

	// Set width of the range to decrease from the right side
	useEffect(() => {
		const minPercent = getPercent(minValRef.current);
		const maxPercent = getPercent(maxVal);

		if (range.current) {
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [maxVal, getPercent]);

	// Get min and max values when their state changes

	return (
		<EntireContainer isOpen={isOpen}>
			<SliderContainer>
				<ThumbLeft
					type="range"
					min={min}
					max={max}
					value={minVal}
					step="1000"
					onChange={(event) => {
						const value = Math.min(Number(event.target.value), maxVal - 1000);
						setMinVal(value);
						minValRef.current = value;
					}}
					className="thumb"
				/>
				<ThumbRight
					type="range"
					min={min}
					max={max}
					step="1000"
					value={maxVal}
					onChange={(event) => {
						const value = Math.max(Number(event.target.value), minVal + 1000);
						setMaxVal(value);
						maxValRef.current = value;
					}}
					className="thumb"
				/>

				<Slider>
					<SliderTrack />
					<SliderRange ref={range} />
				</Slider>
			</SliderContainer>
			<ButtomContainer>
				<ValueBox>
					<ValueDescription>최저 금액</ValueDescription>
					<SliderValue>{minVal.toLocaleString('ko-KR')} 원</SliderValue>
				</ValueBox>
				<IconBox>
					<BsDash />
				</IconBox>
				<ValueBox>
					<ValueDescription>최고 금액</ValueDescription>
					<SliderValue>{maxVal.toLocaleString('ko-KR')} 원</SliderValue>
				</ValueBox>
				<AdoptButton>적용하기</AdoptButton>
			</ButtomContainer>
		</EntireContainer>
	);
}

const EntireContainer = styled.div`
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* border: 1px solid; */
	margin-right: 60px;
	animation: ${(isOpen) =>
		isOpen
			? 'slide-fade-in-dropdown-animation 0.4s ease'
			: 'slide-fade-out-dropdown-animation 0.4s ease'};
	@keyframes slide-fade-in-dropdown-animation {
		0% {
			transform: translateX(15%);
		}

		100% {
			transform: translateX(0);
		}
	}
`;

const SliderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	.thumb {
		pointer-events: none;
		position: absolute;
		height: 0;
		width: 360px;
		outline: none;
	}
`;

const ThumbLeft = styled.input`
	-webkit-appearance: none;
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		-webkit-tap-highlight-color: transparent;
		background-color: white;
		border: 1px solid var(--purple-200);
		border-radius: 50%;
		box-shadow: 0 0 1px 1px #ced4da;
		cursor: pointer;
		height: 29px;
		width: 29px;
		margin-top: 4px;
		pointer-events: all;
		position: relative;
	}
	z-index: 3;
`;
const ThumbRight = styled.input`
	-webkit-appearance: none;
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		-webkit-tap-highlight-color: transparent;
		background-color: white;
		border: 1px solid var(--purple-200);
		border-radius: 50%;
		box-shadow: 0 0 1px 1px #ced4da;
		cursor: pointer;
		height: 29px;
		width: 29px;
		margin-top: 4px;
		pointer-events: all;
		position: relative;
	}
	z-index: 4;
`;

const Slider = styled.div`
	position: relative;
	width: 360px;
`;

const SliderTrack = styled.div`
	background-color: var(--gray-300);
	position: absolute;
	width: 100%;
	z-index: 1;
	height: 2px;
`;
const SliderRange = styled.div`
	background-color: var(--purple-200);
	position: absolute;
	z-index: 2;
	height: 2px;
`;

const ButtomContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 34px;
`;

const ValueBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 106px;
	height: 42px;
	border: 0.8px solid var(--gray-300);
	border-radius: 6px;
	padding: 7px;
`;
const ValueDescription = styled.div`
	color: var(--gray-300);
	font-size: 9px;
	margin-bottom: 6px;
`;

const SliderValue = styled.div`
	color: var(--gray-400);
	font-size: 13px;
	//위의 3개는 보여주는 값의 설정입니다. 밑의 RightValue에도 똑같은 설정 있습니다.
`;

const IconBox = styled.div`
	margin: 0px 23px;
	& > svg {
		path {
			color: var(--gray-300);
		}
	}
`;

const AdoptButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 69px;
	height: 32px;
	border: 0.5px solid var(--purple-200);
	border-radius: 6px;
	background-color: var(--purple-100);
	font-size: 11px;
	font-weight: var(--bold);
	color: var(--purple-200);
	transition: 0.3s all;
	cursor: pointer;
	margin-left: 20px;
	&:hover {
		background-color: var(--purple-200);
		color: var(--purple-100);
	}
`;
