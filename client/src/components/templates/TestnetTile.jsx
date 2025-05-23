import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Text from '../atoms/Text';
import Flexbox from '../atoms/Flexbox';
import { Status, StatusColorMapping, statusIconMap, StatusLabelMapping } from '../../constants/status';
import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg';
import { ReactComponent as HourglassIcon } from '../../assets/icons/hourglass.svg';
import BadgeList from '../molecules/BadgeList';
import { BlockchainIconMap } from '../../constants/blockchain';
import Tile from '../atoms/Tile';
import Button from '../atoms/Button';

const TestnetTile = ({ data }) => {
	const { testnet_off_chain_actors: testnetOffChainActors, testnet_chains: testnetChains, name, status } = data;
	const isBlockchainUpdating = testnetChains.find((chain) => chain.status === Status.UPDATING);
	const offChainUpdatingCount = testnetOffChainActors.filter((chain) => chain.status === Status.UPDATING).length;
	const blockchainIcons = testnetChains.map((blockchain) => BlockchainIconMap[blockchain.chain]);

	const StatusIcon = ({ status }) => {
		const IconComponent = statusIconMap[status] || null;
		return IconComponent ? <IconComponent width="14" height="14" /> : null;
	};

	const getTileThemeByStatus = (status) => {
		switch (status) {
			case Status.FAILED:
				return 'error';
			case Status.KILLED:
				return 'fade';
			default:
				return '';
		}
	};

	const isSettingButtonDisabled = (status) => {
		return status === Status.CLONING || status === Status.PENDING || status === Status.UPDATING;
	};

	return (
		<Tile theme={getTileThemeByStatus(status)} key={data.id}>
			<Flexbox direction="column" gap="8px">
				<Flexbox justifyContent="space-between" gap="8px 30px" breakpoint={600}>
					<Flexbox gap="16px" alignItems="center" className="flex-child-grow">
						<Text className="ellipsize" type="h3">
							{name}
						</Text>
						<span className="tag flex-child-shrink">5321</span>
					</Flexbox>

					<Flexbox gap="16px" alignItems="center" className="flex-child-shrink">
						<Flexbox gap="6px" alignItems="center" style={{ color: StatusColorMapping[status] }}>
							<StatusIcon status={status} />
							<Text fontWeight={600}>{StatusLabelMapping[status]}</Text>
						</Flexbox>
						<span className="dot"></span>
						<Button type="button" theme="primary" disabled={isSettingButtonDisabled(status)}>
							<SettingsIcon width="14" height="14" />
							<Text>Settings</Text>
						</Button>
					</Flexbox>
				</Flexbox>

				<Flexbox justifyContent="space-between" gap="4px" breakpoint={600}>
					<Flexbox gap="12px" wrap="wrap" alignItems="center">
						<Text fontWeight={500}>
							{testnetOffChainActors.length} off-chain actor
							{testnetOffChainActors.length > 1 && 's'}
						</Text>
						{testnetChains.length > 0 && (
							<>
								<span className="dot"></span>
								<Flexbox gap="8px" wrap="wrap" alignItems="center">
									<Text fontWeight={500}>
										{testnetChains.length} blockchain
										{testnetChains.length > 1 && 's'}
									</Text>
									<BadgeList list={blockchainIcons}></BadgeList>
								</Flexbox>
							</>
						)}
					</Flexbox>
					<Flexbox gap="6px" alignItems="center" className="timestamp">
						<ClockIcon width="14" height="14" />
						<Text fontWeight={500}>Modified {moment(data.updated_at).fromNow()}</Text>
					</Flexbox>
				</Flexbox>

				{(offChainUpdatingCount > 0 || isBlockchainUpdating) && (
					<Flexbox gap="12px" alignItems="center" wrap="wrap">
						{offChainUpdatingCount > 0 && (
							<Flexbox gap="6px" alignItems="center" style={{ color: StatusColorMapping[status] }}>
								<HourglassIcon width="14" height="14" />
								<Text fontWeight={600}>{offChainUpdatingCount} off-chain updating</Text>
							</Flexbox>
						)}
						{isBlockchainUpdating && (
							<>
								<span className="dot"></span>
								<Flexbox gap="4px" alignItems="center" style={{ color: StatusColorMapping[status] }}>
									<HourglassIcon width="14" height="14" />
									<Text fontWeight={600}>Blockchain updating</Text>
								</Flexbox>
							</>
						)}
					</Flexbox>
				)}
			</Flexbox>
		</Tile>
	);
};

TestnetTile.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		updated_at: PropTypes.string.isRequired,
		testnet_off_chain_actors: PropTypes.arrayOf(
			PropTypes.shape({
				status: PropTypes.string.isRequired,
			})
		).isRequired,
		testnet_chains: PropTypes.arrayOf(
			PropTypes.shape({
				chain: PropTypes.string.isRequired,
				status: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};

export default TestnetTile;
