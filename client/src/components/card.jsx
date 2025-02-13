import moment from "moment";
import Text from "./text";
import Flexbox from "./flexbox";
import {
  Status,
  StatusColorMapping,
  statusIconMap,
  StatusLabelMapping,
} from "../constants/status";
import { ReactComponent as ClockIcon } from "../assets/icons/clock.svg";
import { ReactComponent as SettingsIcon } from "../assets/icons/settings.svg";
import { ReactComponent as HourglassIcon } from "../assets/icons/hourglass.svg";
import BadgeList from "./badge-list";
import { BlockchainIconMap } from "../constants/blockchain";

export default function Card({ data }) {
  const {
    testnet_off_chain_actors: testnetOffChainActors,
    testnet_chains: testnetChains,
    name,
    status,
  } = data;
  const isBlockchainUpdating = testnetChains.find(
    (chain) => chain.status === Status.UPDATING,
  );
  const offChainUpdatingCount = testnetOffChainActors.filter(
    (chain) => chain.status === Status.UPDATING,
  ).length;
  const blockchainIcons = testnetChains.map(
    (blockchain) => BlockchainIconMap[blockchain.chain],
  );

  const StatusIcon = ({ status }) => {
    const IconComponent = statusIconMap[status] || null;
    return IconComponent ? <IconComponent width="14" height="14" /> : null;
  };

  return (
    <div
      className={`tile ${status === Status.FAILED && "tile--error"} ${status === Status.KILLED && "tile--fade"}`}
      key={data.id}
    >
      <Flexbox justifyContent="space-between">
        <Flexbox gap="10px" alignItems="center">
          <Text type="h3">{name}</Text>
          <span className="tag">5321</span>
        </Flexbox>

        <Flexbox gap="10px" alignItems="center">
          <Flexbox
            gap="5px"
            alignItems="center"
            style={{ color: StatusColorMapping[status] }}
          >
            <StatusIcon status={status} />
            <Text style={{ fontWeight: 600 }} type="span">
              {StatusLabelMapping[status]}
            </Text>
          </Flexbox>
          <span className="dot"></span>
          <button
            type="button"
            className="inline-button"
            disabled={
              status === Status.CLONING ||
              status === Status.PENDING ||
              status === Status.UPDATING
            }
          >
            <SettingsIcon width="14" height="14" />
            <span>Settings</span>
          </button>
        </Flexbox>
      </Flexbox>

      <Flexbox justifyContent="space-between" style={{ marginTop: "5px" }}>
        <Flexbox gap="10px" alignItems="center">
          <Text type="span">
            {testnetOffChainActors.length} off-chain actor
            {testnetOffChainActors.length > 1 && "s"}
          </Text>
          {testnetChains.length > 0 && (
            <>
              <span className="dot"></span>
              <Text type="span">
                {testnetChains.length} blockchain
                {testnetChains.length > 1 && "s"}
              </Text>
              <BadgeList list={blockchainIcons}></BadgeList>
            </>
          )}
        </Flexbox>
        <Flexbox gap="5px" alignItems="center" className="timestamp">
          <ClockIcon width="14" height="14" />
          <Text type="span">Modified {moment(data.updated_at).fromNow()}</Text>
        </Flexbox>
      </Flexbox>

      {(offChainUpdatingCount > 0 || isBlockchainUpdating) && (
        <Flexbox gap="10px" alignItems="center" style={{ marginTop: "5px" }}>
          {offChainUpdatingCount > 0 && (
            <Flexbox
              gap="5px"
              alignItems="center"
              style={{ color: StatusColorMapping[status] }}
            >
              <HourglassIcon width="14" height="14" />
              <span>{offChainUpdatingCount} off-chain updating</span>
            </Flexbox>
          )}
          {isBlockchainUpdating && (
            <>
              <span className="dot"></span>
              <Flexbox
                gap="5px"
                alignItems="center"
                style={{ color: StatusColorMapping[status] }}
              >
                <HourglassIcon width="14" height="14" />
                <span>Blockchain updating</span>
              </Flexbox>
            </>
          )}
        </Flexbox>
      )}
    </div>
  );
}
