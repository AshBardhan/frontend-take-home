import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Flexbox from '../atoms/Flexbox';
import { ReactComponent as ArrowDownShortIcon } from '../../assets/icons/arrow-down-short.svg';
import './Dropdown.scss';

const Dropdown = ({ options, selected, label, onChange }) => {
	let selectedIndex = options.findIndex((option) => option.value === selected);
	if (selectedIndex === -1) {
		selectedIndex = 0;
	}
	const [selectedOption, setSelectedOption] = useState(options[selectedIndex]);
	const dropdownRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const onDropdownButtonClick = useCallback(
		(e) => {
			setIsOpen(!isOpen);
			e.stopPropagation();
		},
		[isOpen]
	);

	const onDropdownOptionClick = useCallback(
		(option) => {
			setSelectedOption(option);
			onChange(option.value);
			setIsOpen(false);
		},
		[onChange]
	);

	const getDropdownIcon = (option) => {
		const IconComponent = option?.icon || null;
		return IconComponent ? <IconComponent width="14" height="14" /> : null;
	};

	useEffect(() => {
		const pageClickEvent = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		window.addEventListener('click', pageClickEvent);
		return () => {
			window.removeEventListener('click', pageClickEvent);
		};
	}, []);

	return (
		<div className="dropdown" ref={dropdownRef}>
			<div className="dropdown-button" onClick={onDropdownButtonClick}>
				{label && (
					<span className="dropdown-button-label" data-testid="dropdown-button-label">
						{label}
					</span>
				)}
				<Flexbox alignItems="center" justifyContent="center" gap="6px" style={{ color: selectedOption.color || '' }}>
					{selectedOption.icon && getDropdownIcon(selectedOption)}
					<span className="dropdown-button-selected-label" data-testid="dropdown-button-selected-label">
						{selectedOption.label}
					</span>
				</Flexbox>
				<ArrowDownShortIcon className="icon" width="10" height="10" />
			</div>
			<div className={`dropdown-menu ${isOpen ? 'open' : ''}`} data-testid="dropdown-menu">
				{options.map((option, index) => (
					<div
						className={`dropdown-menu-option ${option.value === selectedOption.value && 'selected'}`}
						data-testid={`dropdown-option-${index}`}
						role="button"
						tabIndex={0}
						onKeyDown={(e) => e.key === 'Enter' && onDropdownOptionClick(option)}
						key={option.value}
						onClick={() => onDropdownOptionClick(option)}
					>
						<Flexbox alignItems="center" justifyContent="center" gap="6px" style={{ color: option.color || '' }}>
							{option.icon && getDropdownIcon(option)}
							{option.label}
						</Flexbox>
					</div>
				))}
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			color: PropTypes.string,
			icon: PropTypes.elementType,
		})
	).isRequired,
	selected: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default Dropdown;
