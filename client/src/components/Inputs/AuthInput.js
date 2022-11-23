/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

export default function AuthInput({
	refAddress,
	onKeyDown,
	label,
	className,
	register,
	refHook,
	watch = {
		이메일: '',
		비밀번호: '',
		닉네임: '',
	},
	errors,
}) {
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (!errors) {
			setShowError(false);
		}
	}, [errors]);

	return (
		<InputBox isFilled={!!watch[label]} className={className}>
			<input
				id={label}
				type="text"
				onKeyDown={(e) => onKeyDown(e, setShowError)}
				{...register}
				name={label}
				ref={(e) => {
					refHook(e);
					refAddress.current = e;
				}}
				className={showError ? 'showError' : null}
			/>
			<label htmlFor={label} className="placeholder">
				{label}
			</label>
			<ErrorDiv className={showError ? 'showError' : null}>{errors}</ErrorDiv>
		</InputBox>
	);
}

const InputBox = styled.div`
	width: 100%;
	position: relative;
	font-size: 18px;
	margin-top: 15px;

	& .placeholder {
		position: absolute;
		top: 20px;
		left: 2px;
		transform: translateY(-50%);
		transition: 0.3s ease-in-out;
		color: var(--gray-200);
		cursor: text;
		font-weight: 500;
		font-size: 18px;
	}
	& input[type='text'] {
		width: 100%;
		height: 40px;
		border: none;
		outline: none;
		border-bottom: 1px solid var(--gray-200);
		font-size: 18px;
		transition: 0.2s ease-in-out;
	}
	& input[type='text']:focus {
		border-bottom: 1px solid var(--purple-200);
		caret-color: var(--purple-200);
		&.showError {
			border-bottom: 1px solid var(--red-100);
			caret-color: var(--red-100);
		}
	}
	${({ isFilled }) =>
		isFilled &&
		css`
			.placeholder {
				color: var(--gray-300);
				font-size: 13px;
				top: 0px;
				left: 0px;
				font-weight: 300;
			}
		`}
`;

const ErrorDiv = styled.div`
	display: block;
	color: white;
	&.showError {
		color: var(--red-100);
	}
	font-size: 11px;
	margin-top: 5px;
	min-height: 15px;
`;
